import { connect } from 'react-redux'
import User from 'src/pages/user';

const mapStateToProps = ({user}:StoreState) => {
  return {
    ...user.user
  }
}
export default connect(mapStateToProps)(User)