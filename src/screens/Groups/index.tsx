import { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';
import { groupGetAll } from '@storage/group/groupGetAll';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();
  async function fetchGroups(){
    try {
      const data = await groupGetAll();
      setGroups(data);
    } catch (error) {
      
    }
  }
  useFocusEffect(useCallback(()=>{
    fetchGroups();
  },[]))
  function handleAddGroup(){
    navigation.navigate('new');
  }
  function handleOpenGroup(group:string){
    navigation.navigate('players',{group});
  }
  return (
    <Container>
      <Header />
      <Highlight 
        title="Turmas"
        subtitle="jogue com sua turma"
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
            onPress={()=>handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button 
        title='Criar nova turma'
        onPress={handleAddGroup}
      />
    </Container>
  );
}