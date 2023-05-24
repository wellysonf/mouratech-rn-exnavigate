import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState('');
  
  async function handleAdd(){
    await groupCreate(group);
    navigation.navigate('players',{group})
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        
        <Highlight 
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button 
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleAdd}
        />
      </Content>
    </Container>
  )
}