import React, { Component } from 'react'


class StageForm extends Component {
  render() {
    return(
      <div>
      <form>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="stage0"
              checked={this.props.stage === 0}
              onChange={this.props.change}
              className="form-check-input"
            />
            Off
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="stage1"
              checked={this.props.stage === 1}
              onChange={this.props.change}
              className="form-check-input"
            />
            Stage 1
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="stage2"
              checked={this.props.stage === 2}
              onChange={this.props.change}
              className="form-check-input"
            />
            Stage 2
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="stage3"
              checked={this.props.stage === 3}
              onChange={this.props.change}
              className="form-check-input"
            />
            Stage 3
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="stage4"
              checked={this.props.stage === 4}
              onChange={this.props.change}
              className="form-check-input"
            />
            Stage 4
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="stage5"
              checked={this.props.stage === 5}
              onChange={this.props.change}
              className="form-check-input"
            />
            Stage 5
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="stage6"
              checked={this.props.stage === 6}
              onChange={this.props.change}
              className="form-check-input"
            />
            Stage 6
          </label>
        </div>
      </form>
      </div>
    )
  }
}

export default StageForm
