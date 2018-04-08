import { expect } from "chai"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import PropTypes from "prop-types"
import noop from "lodash/noop"
import STAGES from "../../../web/static/js/configs/stages"

const { IDEA_GENERATION } = STAGES

Enzyme.configure({ adapter: new Adapter() })

global.hj = noop
global.expect = expect

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}

global.mountWithConnectedSubcomponents = (component, options) => {
  const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
      facilitatorId: 1,
      votes: [],
      stage: IDEA_GENERATION,
      usersById: {},
      presences: [],
    }),
  }

  const defaultOptions = {
    context: { store },
    childContextTypes: { store: PropTypes.object.isRequired },
  }

  return Enzyme.mount(component, { ...defaultOptions, ...options })
}
