import * as Test from "node:test";
import { RuleTester } from "@typescript-eslint/rule-tester";

/* eslint-disable @typescript-eslint/no-misused-promises */
// False positive, see: https://typescript-eslint.io/packages/rule-tester#nodejs-nodetest

RuleTester.afterAll = Test.after;
RuleTester.describe = Test.describe;
RuleTester.it = Test.it;
RuleTester.itOnly = Test.it.only;

/* eslint-enable @typescript-eslint/no-misused-promises */
