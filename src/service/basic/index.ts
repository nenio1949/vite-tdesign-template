import authorityAPIs from './authority'
import publicAPIs from './public'
import weatherAPIs from './weather'

export default {
  ...authorityAPIs,
  ...publicAPIs,
  ...weatherAPIs
}
