export const rootPaths = {
  root: '/',
  pagesRoot: '/',
  authRoot: '/authentication',
  errorRoot: '/error',
};

/**
 * Object containing various paths used in the application.
 */
const paths = {
  default: `${rootPaths.root}`,
  categories: `${rootPaths.pagesRoot}categories`,
  employees: `${rootPaths.pagesRoot}employees`,
  actions: `${rootPaths.pagesRoot}actions`,
  users: `${rootPaths.pagesRoot}users`,
  masterData: `${rootPaths.pagesRoot}masterData`,
  permissions: `${rootPaths.pagesRoot}permissions`,
  subAdmins: `${rootPaths.pagesRoot}sub-admins`,
  login: `${rootPaths.authRoot}/login`,
  signup: `${rootPaths.authRoot}/sign-up`,
  forgotPassword: `${rootPaths.authRoot}/forgot-password`,
  resetPassword: `${rootPaths.authRoot}/reset-password`,
  notFound: `${rootPaths.errorRoot}/404`,
};

export default paths;
