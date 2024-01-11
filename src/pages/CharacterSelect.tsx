/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridBox, Box, Card, Button } from '@biom3/react';

import { Layout } from '../components/Layout';
import './CharacterSelect.css';
import { useGameContext } from '../context/GameContext';
import { useMintCharacter } from '../hooks/useMintCharacter';

type CharacterOption = {
  id: number;
  name: string;
};

const characterOptions: CharacterOption[] = [
  { id: 1, name: 'ibis' },
  { id: 2, name: 'bull' },
  { id: 3, name: 'corgi' },
  { id: 4, name: 'kookaburra' },
  { id: 5, name: 'emu' },
  { id: 6, name: 'wombat' },
  { id: 7, name: 'kiwi' },
  { id: 8, name: 'quokka' },
  { id: 9, name: 'penguin' },
  { id: 10, name: 'wallaby' },
];

const imageUrl =
  'https://dogfooding2024.s3.amazonaws.com/images/character-image-__TOKEN__ID-1.png';

const getImageUrl = (tokenId: number) =>
  imageUrl.replace('__TOKEN__ID', tokenId.toString());

const CharacterSelect = () => {
  const navigate = useNavigate();
  const { setTokenId, walletAddress } = useGameContext();

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterOption>(
    characterOptions[0]
  );

  const { mint, isMining } = useMintCharacter({
    walletAddress,
    characterId: selectedCharacter.id,
  });

  const onLetsGo = () => {
    const characterId = selectedCharacter.id;
    const character = localStorage.getItem(`game.character.${characterId}`);

    if (character) {
      const { tokenId } = JSON.parse(character);
      setTokenId(tokenId);
    } else {
      mint(({ tokenId }: { tokenId: number }) => {
        console.log('minted', tokenId);
        localStorage.setItem(
          `game.character.${characterId}`,
          JSON.stringify({ characterId, tokenId })
        );
        setTokenId(tokenId);
      });
    }

    navigate('/game');
  };

  return (
    <Layout
      nav={{
        title: 'Choose your character',
      }}
      sxOverride={{
        justifyContent: 'space-between',
      }}
    >
      <GridBox
        sx={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridGap: '1rem',
          mb: '2rem',
        }}
      >
        {characterOptions.map((option) => (
          <Card
            key={option.id}
            sx={{
              transform: option.id === selectedCharacter.id ? 'scale(1.1)' : '',
              borderStyle: option.id === selectedCharacter.id ? 'solid' : '',
              borderColor: 'base.color.status.success.bright',
              borderWidth: 'base.border.size.600',
              animation: 'moveUpDown 1s infinite',
              animationPlayState:
                option.id === selectedCharacter.id ? 'running' : 'paused',
              '& .textContainer': {
                height: '2rem',
                padding: '0',
                margin: '0',
              },
              '& .innerTextContainer': {
                padding: '0.5rem',
              },
            }}
            onClick={() => setSelectedCharacter(option)}
          >
            <Card.AssetImage imageUrl={getImageUrl(option.id)} />
            <Card.Caption>{option.name}</Card.Caption>
          </Card>
        ))}
      </GridBox>
      <Box>
        <Button onClick={onLetsGo} disabled={isMining}>
          Let's go!
          <Button.Icon
            icon={isMining ? 'Loading' : 'ArrowForward'}
            sx={{
              fill: 'base.color.accent.1',
              width: 'base.spacing.x6',
            }}
          />
        </Button>
      </Box>
    </Layout>
  );
};

export default CharacterSelect;
