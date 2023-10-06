import { reactive, ref } from 'vue';
import { useApi } from './api';

export function useUserAbilities() {
  
  let userAbilitiesReq = reactive(useApi());
  let abilities = ref();
  let abilitiesGrouped = ref();

  let getUserAbilities = () => {
    userAbilitiesReq.send(
      '/api/v1/user-abilities'
    )
    .then (res => {
      if (res) {
        abilities.value = res.abilities;
        abilitiesGrouped.value = res.abilitiesGrouped;
      }
    });
  }

  let allow = (ability, category) => {
    if (abilities.value) {
      let userAbility = abilities.value.find(item => {
        return (
          item.ability === ability && 
          item.category === category 
        );
      });
  
      return userAbility && userAbility.is_able;
    }
  }

  let allowSome = (abilities) => {
    let pairs = abilities.split('|');
    
    return pairs.some(pair => {
      return allow(pair.split(',')[0], pair.split(',')[1]);
    });
  }

  let deny = (ability, category) => {
    return ! allow(ability, category);
  }

  let refresh = () => {
    getUserAbilities();
  }

  getUserAbilities();

  return {
    abilities,
    abilitiesGrouped,
    allow,
    allowSome,
    deny
  }
}