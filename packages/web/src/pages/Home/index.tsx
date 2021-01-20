import React, { useState, useCallback, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import { Badge } from '~/components/Badge';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';

import { TagContainer, TagInput } from './styles';

export const HomePage: React.FC = () => {
  document.title = 'Início | Christino';

  const inputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);

  const addTags = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && inputRef.current) {
      inputRef.current.value.split(',').forEach((tag) => {
        if(tag) {
          setTags((old) => [...old, tag.trim()]);
        }
      });

      inputRef.current.value = '';
    }
  }, []);

  return (
    <Layout>
      <Card>
        <TagContainer>
          {tags.map((tag) => (
            <Badge>
              <span>{ tag }</span>
              <i className="close">
                <FaTimes />
              </i>
            </Badge>
          ))}
          <TagInput ref={inputRef} placeholder="Digite aqui..." onKeyUp={addTags} />
        </TagContainer>
      </Card>
    </Layout>
  );
};
