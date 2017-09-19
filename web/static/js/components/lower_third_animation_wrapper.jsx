import React from "react"
import PropTypes from "prop-types"
import ReactCSSTransitionReplace from "react-css-transition-replace"

import styles from "./css_modules/lower_third_animation_wrapper.css" // eslint-disable-line no-unused-vars

const LowerThirdAnimationWrapper = ({ children, displayContents, stage }) => {
  const contents = (
    <div key={stage}>
      {children}
    </div>
  )

  return (
    <ReactCSSTransitionReplace
      transitionName="translateY"
      overflowHidden={false}
      transitionAppear
      component="div"
      transitionLeave
      transitionEnter
      transitionEnterTimeout={700}
      transitionAppearTimeout={700}
      transitionLeaveTimeout={700}
    >
      {displayContents && contents}
    </ReactCSSTransitionReplace>
  )
}

LowerThirdAnimationWrapper.propTypes = {
  stage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  displayContents: PropTypes.bool.isRequired,
}

export default LowerThirdAnimationWrapper