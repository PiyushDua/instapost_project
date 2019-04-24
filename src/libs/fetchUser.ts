const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-968110.okta.com/oauth2/default',
  clientId: '0oaf8vl6btMh6U5fu356',
  assertClaims: {
    aud: 'api://default',
  },
});;

async function fetchUser(header: any) {
  console.log('inside fetch user');
  const match = header.match(/Bearer (.+)/);

  if (!match) {
    return undefined;
  }

  const accessToken = match[1];
  const { claims: { sub } } =  await oktaJwtVerifier.verifyAccessToken(accessToken);
  console.log('fetchUser.ts [sub]', sub);
  return sub;
}

export default fetchUser;
