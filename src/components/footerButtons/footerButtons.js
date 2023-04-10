import React, {useState} from 'react';
import * as s from './styledFooterButtons';
import {shadow, icons} from '../../assets';
import {useSearch} from '../../context';
import {Modal} from '../../components';

const FooterButtons = ({navigation, clearSearch}) => {
  const {registeredSongs} = useSearch();
  const [isOpen, setIsOpen] = useState({modal: false, song: {}});

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const recommendSong = () => {
    setIsOpen({
      modal: true,
      song: registeredSongs[
        getRandomIntInclusive(0, registeredSongs.length - 1)
      ],
    });
  };

  return (
    <s.Container style={shadow}>
      <Modal
        modalOk
        isOpen={isOpen.modal}
        song={isOpen.song}
        closeModal={() => setIsOpen({modal: false, song: {}})}
      />

      <s.RandomButton onPress={recommendSong}>
        <s.RandomIcon source={icons.random} />
      </s.RandomButton>
      <s.Wrapper
        onPress={() => {
          clearSearch();
          navigation.navigate('Cadastrar música', {editId: null});
        }}>
        <s.Text style={{fontFamily: 'Nunito-Black'}}>Adicionar música</s.Text>
        <s.AddMusicButton style={shadow}>
          <s.TextButton style={{fontFamily: 'Nunito-Bold'}}>+</s.TextButton>
        </s.AddMusicButton>
      </s.Wrapper>
    </s.Container>
  );
};

export default FooterButtons;