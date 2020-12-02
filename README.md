# Dinogram but Serverless

# Goals of the Project and Philosophy

I like writing articles about dinosaurs. I don't like maintaining blog websites. So my goal is to create a website that allows a workflow like this:
 - Write/format article with MailChimp
 - Send out MailChimp campaign 
 - Campaign automatically adds to site with site-specific styling

## Tech Stack
 - Backend
   - AWS CDK
     - I'm tired of dealing with HTTPS problems between a frontend and a backend
     - Lambda, API Gateway, DynamoDB
   - ApolloGraphQL
   - MailChimp API
 - Frontend
   - TypeScript
   - React (duh)
   - RxJS
   - GSAP?
 - Shared/Setup
   - Lerna