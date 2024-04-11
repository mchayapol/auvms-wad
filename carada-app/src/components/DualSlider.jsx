import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './duoslider.css';



export const DuoSlider = ({ min, max, step, gap, onChange }) => {
  const [from, setFrom] = useState(min);
  const [to, setTo] = useState(max);
  const [sliderStyle, setSliderStyle] = useState({})

  const fromSliderRef = useRef(min);
  const toSliderRef = useRef(max);
  const fromInputRef = useRef(min);
  const toInputRef = useRef(max);

  useEffect(() => {
    setSliderStyle({
      background: `linear-gradient(
          to right,
          #C6C6C6 0%,
          #C6C6C6 ${(from - min) / (max - min) * 100}%,
          #25daa5 ${(from - min) / (max - min) * 100}%,
          #25daa5 ${(to - min) / (max - min) * 100}%, 
          #C6C6C6 ${(to - min) / (max - min) * 100}%, 
          #C6C6C6 100%)`
    })

    if (onChange)
      onChange({from, to})
  },
    [from, to]
  )


  return (
    <div className="range_container">
      <div className="sliders_control" style={sliderStyle}>
        <input
          type="range"
          ref={fromSliderRef}
          // _onInput={controlFromSlider}
          onChange={() => {
            const from = parseInt(fromSliderRef.current.value)
            const to = parseInt(toSliderRef.current.value)
            if (from < to)
              setFrom(from)
          }}
          value={from}
          step={step}
          min={min}
          max={max}
        />
        <input
          type="range"
          ref={toSliderRef}
          // _onInput={controlToSlider}
          onChange={() => {
            const from = parseInt(fromSliderRef.current.value)
            const to = parseInt(toSliderRef.current.value)
            if (from < to)
              setTo(to)
          }}
          value={to}
          step={step}
          min={min}
          max={max}
        />
      </div>
      <div className="form_control_container">
        <div>
          <label htmlFor='from_input' className='range_label'>Min</label>
          <input
            id='from_input'
            type="number"
            id="fromInput"
            ref={fromInputRef}
            onChange={() => {
              const from = parseInt(fromInputRef.current.value)
              const to = parseInt(toInputRef.current.value)
              if (from < (to - (to * gap)))
                setFrom(from)
            }}
            value={from}
            min={min}
            max={max} />
        </div>
        <div>
          <label htmlFor='to_input' className='range_label'>Max</label>
          <input
            id="to_input"
            type="number"
            id="toInput"
            ref={toInputRef}
            onChange={() => {
              const from = parseInt(fromInputRef.current.value)
              const to = parseInt(toInputRef.current.value)
              if (from < (to - (to * gap)))
                setTo(to)
            }}
            value={to}
            min={min}
            max={max} />
        </div>
      </div>
    </div>
  );
};


DuoSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  gap: PropTypes.number,
  onChange: PropTypes.func,
};

DuoSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 10,
  gap: 0.1,
  onChange: undefined,
};
