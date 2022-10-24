const dev_domain = '';
const prod_domain = '';

/**
 * @description auth api
 */
function postRegister() {
  return '/user/register';
}
function getUser() {
  return '/user/get_user';
}

export {dev_domain, prod_domain, postRegister, getUser};
