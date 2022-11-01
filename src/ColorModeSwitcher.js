import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
    fontSize={'10'}
    shadow={'xl'}
    borderEndColor={'white'}
      variant="unstlyed"
      color="current"
      pos={'fixed'}
      zIndex={'overlay'}
      top={"0"}
      right={"0"}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};

export default ColorModeSwitcher;