const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  role: state => state.user.role,
  name: state => state.user.name,
  id: state => state.user.id
}
export default getters
