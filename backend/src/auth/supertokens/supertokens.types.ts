import EmailVerification from 'supertokens-node/recipe/emailverification';
import Session from 'supertokens-node/recipe/session';

export const STSessionHandler = Session;
export const STEmailVerificationHandler = EmailVerification;

// export type STSession =
//   import('supertokens-node/lib/build/recipe/session/sessionClass').default;

export { SessionContainer as STSession } from 'supertokens-node/recipe/session';
