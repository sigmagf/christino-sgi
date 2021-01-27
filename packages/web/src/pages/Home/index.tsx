/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';

import { TagContainer, TagInput } from './styles';

export const HomePage: React.FC = () => {
  document.title = 'Início | Christino';

  const inputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);

  const removeTags = (key: number) => {
    const newTags = tags.filter((e, k) => k !== key);

    setTags(newTags);
  };

  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(inputRef.current) {
      if(e.key === 'Enter') {
        inputRef.current.value.split(',').forEach((tag) => {
          if(tag) {
            setTags((old) => [...old, tag.trim()]);
          }
        });

        inputRef.current.value = '';
      }

      if(e.key === 'Backspace' && !inputRef.current.value) {
        removeTags(tags.length - 1);
      }
    }
  };

  return (
    <Layout>
      <Card>
        <TagContainer>
          {tags.map((tag, key) => (
            <span key={Math.random() * (1000 - 0) + 0}>
              { tag }
              <i onClick={() => removeTags(key)}>
                <FaTimes />
              </i>
            </span>
          ))}
          <TagInput ref={inputRef} autoFocus placeholder="Digite aqui..." onKeyUp={addTags} />
        </TagContainer>
      </Card>
    </Layout>
  );
};
