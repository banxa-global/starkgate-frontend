import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as SwapIcon} from '../../../assets/svg/icons/swap.svg';
import {useColors} from '../../../hooks';
import utils from '../../../utils';
import {Circle} from '../index';
import styles from './NetworkSwap.module.scss';

export const NetworkSwap = ({isFlipped, onClick}) => {
  const {colorAlpha5} = useColors();

  return (
    <div
      className={utils.object.toClasses(styles.networkSwap, isFlipped && styles.flipped)}
      onClick={onClick}
    >
      <Circle
        color={colorAlpha5}
        size={50}
        style={{
          boxShadow: '0px 5px 35px rgba(0, 0, 0, 0.30)'
        }}
      >
        <SwapIcon />
      </Circle>
    </div>
  );
};

NetworkSwap.propTypes = {
  isFlipped: PropTypes.bool,
  onClick: PropTypes.func
};
