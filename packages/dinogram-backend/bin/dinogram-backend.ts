#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DinogramBackendStack } from '../lib/dinogram-backend-stack';

const app = new cdk.App();
new DinogramBackendStack(app, 'DinogramBackendStack');
