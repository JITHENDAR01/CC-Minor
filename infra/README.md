# New CampusConnect AWS stack

The CloudFormation template creates a new, isolated stack named `campusconnect-new` in `eu-north-1`. It does not import, update, or delete the existing ECS cluster/service.

## Resources

- CloudFront HTTPS endpoint, private static frontend in S3, API Application Load Balancer, and backend ECS Fargate service
- Private PostgreSQL RDS instance with AWS-managed master credentials
- ECR repository with immutable image tags and a 20-image lifecycle limit
- Private, encrypted, versioned S3 upload bucket served through CloudFront Origin Access Control
- Secrets Manager signing key, CloudWatch log group, and least-privilege ECS task/execution roles
- VPC with public app/load-balancer subnets and private database subnets; no NAT Gateway

The React frontend is deployed separately from the Node API container. CloudFront serves the private S3 frontend and upload bucket, and routes `/api/*` to the ECS service. The app currently uses PostgreSQL-specific SQL and relational foreign keys. DynamoDB is intentionally not provisioned: it cannot replace PostgreSQL without rewriting the app's data layer and migrations.

CloudFront uses HTTPS for browser connections, while its origin connection to the ALB uses HTTP because no owned domain or ACM certificate was provided. The ALB accepts traffic only from CloudFront's managed origin-facing prefix list, but this is not end-to-end TLS. For production authentication, provide a domain and certificate so the CloudFront-to-ALB origin can also use HTTPS before relying on this stack for real users.

## Deploy

The GitHub workflow `.github/workflows/provision-new-stack.yml` provisions the stack, builds the frontend and backend image on a GitHub-hosted runner, uploads static frontend assets, pushes the backend image to the new ECR repository, registers the task definition, and starts the ECS service. Docker is not installed or used on the developer machine.

1. Commit and push these changes to the GitHub default branch. The old workflow is now manual-only, so a push will not deploy to the old ECS service.
2. In GitHub Actions, run **Provision and deploy new CampusConnect stack** on the default branch.
3. The GitHub `production` environment must have `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` secrets. The AWS identity must be authorized to create the CloudFormation resources in this template and pass the new ECS task roles. The existing `CampusConnectEcsDeploy` policy is for updating the old service and is not sufficient to provision this stack. Prefer a dedicated, temporary infrastructure-provisioning role or a trusted administrator rather than granting `AdministratorAccess` to the everyday deploy user.
4. Check the workflow's final URL and confirm the ECS service reaches steady state.

The local AWS profile currently returns `InvalidClientTokenId`, so use valid credentials before attempting AWS CLI operations from this machine. Refresh/rotate the AWS access key securely; never commit or share credentials.

## Cost and data safety

This is not a free-tier guarantee. The ALB, RDS database/storage/backups, Fargate task, ECR, CloudFront traffic, Secrets Manager, and logs can incur charges. The stack intentionally omits NAT Gateways to avoid their fixed hourly cost. Review current `eu-north-1` pricing before running the workflow.

The database uses a small single-AZ `db.t4g.micro` instance, is private and encrypted, and has seven-day backups. The database is configured with deletion protection and a snapshot retention policy; the S3 bucket is retained on stack deletion. Do not deploy the workflow unless the ongoing cost and data-retention behavior are acceptable.
