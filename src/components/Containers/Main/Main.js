import React, {useEffect, useState} from 'react';

import {Breakpoints} from '../../../enums';
import {useVars, useWindowSize} from '../../../hooks';
import {TokensProvider} from '../../../providers/TokensProvider';
import {useL1Wallet, useL2Wallet} from '../../../providers/WalletsProvider';
import {Bridge, Login} from '../../Features';
import styles from './Main.module.scss';

export const Main = () => {
  const windowSize = useWindowSize();
  const {mainOffset, mainOffsetSmall} = useVars();
  const {isConnected: isL1Connected} = useL1Wallet();
  const {isConnected: isL2Connected} = useL2Wallet();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    Breakpoints.largeHeightScreens(windowSize)
      ? setHeight(document.body.offsetHeight - mainOffset)
      : setHeight(document.body.offsetHeight - mainOffsetSmall);
    Breakpoints.mediumWidthScreens(windowSize)
      ? setWidth(document.body.offsetWidth - 378)
      : setWidth('100%');
  }, [windowSize]);

  return (
    <main className={styles.main} style={{height, width}}>
      {isL1Connected && isL2Connected ? (
        <TokensProvider>
          <Bridge />
        </TokensProvider>
      ) : (
        <Login />
      )}
    </main>
  );
};
