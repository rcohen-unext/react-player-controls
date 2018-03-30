import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import * as Icon from './icons.js'

const { bool, func, object, string } = PropTypes

const noop = () => {}

/**
 * Play and pause controls
 */
class PlaybackControls extends Component {
  static propTypes = {
    onPlaybackChange: func.isRequired,
    isPlayable: bool,
    isPlaying: bool,
    showPrevious: bool,
    hasPrevious: bool,
    onPrevious: func,
    showNext: bool,
    hasNext: bool,
    onNext: func,
    className: string,
    style: object,
    childClasses: object,
    childrenStyles: object,
  }

  static defaultProps = {
    isPlayable: false,
    isPlaying: false,
    showPrevious: true,
    hasPrevious: false,
    onPrevious: noop,
    showNext: true,
    hasNext: false,
    onNext: noop,
    className: 'PlaybackControls',
    style: {},
    childClasses: {},
    childrenStyles: {},
  }

  @autobind
  handlePlay () {
    if (this.props.isPlayable) {
      this.props.onPlaybackChange(true)
    }
  }

  @autobind
  handlePause () {
    this.props.onPlaybackChange(false)
  }

  render () {
    const {
      isPlayable, isPlaying,
      showPrevious, hasPrevious, onPrevious,
      showNext, hasNext, onNext,
      className, childClasses, style, childrenStyles,
    } = this.props

    return (
      <div
        className={classNames(className, { isPlayable, isPlaying })}
        style={style}
      >
        { showPrevious && (
          <Button
            isEnabled={hasPrevious}
            onClick={onPrevious}
            className={childClasses.PrevButton}
            style={childrenStyles.PrevButton}
          >
            <Icon.PreviousIcon />
          </Button>
        )}

        { isPlaying && isPlayable
          ? <Button
              onClick={this.handlePause}
              className={childClasses.PauseButton}
              style={childrenStyles.PauseButton}
            >
              <Icon.PauseIcon />
            </Button>
          : <Button
              isEnabled={isPlayable}
              onClick={this.handlePlay}
              className={childClasses.PlayButton}
              style={childrenStyles.PlayButton}
            >
              <Icon.PlayIcon />
            </Button>
        }

        { showNext && (
          <Button
            isEnabled={hasNext}
            onClick={onNext}
            className={childClasses.NextButton}
            style={childrenStyles.NextButton}
          >
            <Icon.NextIcon />
          </Button>
        )}
      </div>
    )
  }
}

export default PlaybackControls
