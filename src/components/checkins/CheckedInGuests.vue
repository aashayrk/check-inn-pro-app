<template>
  <div>
    <info-section section-title="Guests">
      <template #actions>

        <!-- add guest -->
        <!-- <modal-dialog v-if="checkIn" :disabled="checkedInGuests.length === props.checkIn.package.adult_count_max || props.checkIn.checked_out === 1 || userAbilities.deny('addGuest', 'checkIns')">
          <template #trigger>
            <button class="btn btn-primary ml-1" title="Add Guest" :disabled="checkedInGuests.length === props.checkIn.package.adult_count_max || props.checkIn.checked_out === 1 || userAbilities.deny('addGuest', 'checkIns')">
              <span>Add Guest</span>
              <msr-icon>add</msr-icon>
            </button>
          </template>
          <template #default="defaultProps">
            <info-section section-title="Add Guest">
              <add-guest :check-in="checkIn" @close="onGuestAdded(defaultProps, $event)"></add-guest>
            </info-section>
          </template>
        </modal-dialog> -->
      </template>
      <template #default>
        <div v-if="checkedInGuestsReq.success">
          <div v-if="checkedInGuests.length">
            <div v-for="(item, index) in checkedInGuests" :key="index" class="row-item">
              <div class="data-row">
                <div class="data-info">
                  <div class="row">
                    <div class="col-1 flex items-center">

                      <!-- avatar -->
                      <div class="mr-4">
                        <preview-document :documents="item.guest.documents" type="Photo">
                          <template #trigger>
                            <img :src="`${item.guest.avatar}`" class="w-16 h-16 rounded-full ring ring-primary-200 cursor-pointer">
                          </template>
                        </preview-document>
                      </div>
                      
                      <!-- info -->
                      <div>
                        <p class="leading-none">{{ item.guest.name }}</p>
                        <p class="leading-none text-xs mt-1">{{ item.guest.contact_number }}, {{ item.guest.email_address }}</p>
                        <div class="col-tags mt-1" v-if="props.checkIn">
                          <p class="tag bg-lime-300" v-if="props.checkIn.house_guest">House Guest</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="data-actions flex">
                  <!-- <dropdown-menu size="lg">
                    <template #trigger>
                      <button class="btn btn-round btn-small">
                        <msr-icon>more_vert</msr-icon>
                      </button>
                    </template>
                    <template #default="dropdownProps">
                      <div class="m-2"> -->

                        <!-- create pref -->
                        <!-- <modal-dialog :disabled="userAbilities.deny('createPreference', 'guestProfiles')">
                          <template #trigger>
                            <button class="btn btn-transparent w-full" :disabled="userAbilities.deny('createPreference', 'guestProfiles')">
                              <msr-icon>add</msr-icon>
                              <span>New Preference</span>
                            </button>
                          </template>
                          <template #default="defaultProps">
                            <info-section section-title="Create Preference">
                              <create-pref :guest-id="item.guest.id" @close="onPrefCreated(defaultProps, $event)"></create-pref>
                            </info-section>
                          </template>
                        </modal-dialog> -->

                        <!-- go to profile -->
                        <!-- <a :href="`/guest-profiles/${item.guest.id}`" class="btn btn-transparent w-full" v-if="userAbilities.allow('createPreference', 'guestProfiles')">
                          <msr-icon>arrow_forward</msr-icon>
                          <span>Go to Profile</span>
                        </a> -->

                        <!-- remove guest -->
                        <!-- <modal-dialog :disabled="checkedInGuests.length === 1">
                          <template #trigger>
                            <button class="btn btn-transparent w-full" :disabled="checkedInGuests.length === 1">
                              <msr-icon>remove</msr-icon>
                              <span>Remove Guest</span>
                            </button>
                          </template>
                          <template #default="defaultProps">
                            <info-section section-title="Remove Guest">
                              <confirm-delete @confirm="onGuestRemovalConfirmed(item, defaultProps)" @cancel="defaultProps.close()">
                                Are you sure you want to remove this guest? This action cannot be undone!
                              </confirm-delete>
                            </info-section>
                          </template>
                        </modal-dialog> -->
                      <!-- </div>
                    </template>
                  </dropdown-menu> -->
                </div>
              </div>
                
              <!-- preferences -->
              <div v-if="userAbilities.allow('viewPreferences', 'guestProfiles')">
                <div class="p-6" v-if="item.guest.prefs && item.guest.prefs.length > 0">
                  <div class="col-tags">
                    <p class="tag bg-primary-200">Preferences for {{ item.guest.name }}</p>
                  </div>
                  <div class="border border-stone-100 rounded-xl mt-2">
                    <div class="data-row" v-for="(pref, index) in item.guest.prefs" :key="index">
                      <div class="data-info">
                        <div class="flex items-center p-6 py-2">
                          <msr-icon class="pr-4 flex-shrink-0 text-amber-400">info</msr-icon>
                          <p class="leading-none">{{ pref.description }}</p>
                        </div>
                      </div>
                      <!-- <div class="data-actions flex">
                        <modal-dialog :disabled="userAbilities.deny('modifyPreference', 'guestProfiles')">
                          <template #trigger>
                            <button class="btn btn-small btn-round" :disabled="userAbilities.deny('modifyPreference', 'guestProfiles')">
                              <msr-icon>edit</msr-icon>
                            </button>
                          </template>
                          <template #default="defaultProps">
                            <info-section section-title="Edit Preference">
                              <edit-pref :guest-id="item.guest.id" :pref="pref" @close="onPrefUpdated(defaultProps, $event)"></edit-pref>
                            </info-section>
                          </template>
                        </modal-dialog>
                        <modal-dialog class="ml-1" :disabled="userAbilities.deny('destroyPreference', 'guestProfiles')">
                          <template #trigger>
                            <button class="btn btn-small btn-round" :disabled="userAbilities.deny('destroyPreference', 'guestProfiles')">
                              <msr-icon>delete</msr-icon>
                            </button>
                          </template>
                          <template #default="defaultProps">
                            <info-section section-title="Delete Preference">
                              <confirm-delete @confirm="deletePref(defaultProps, item.guest, pref)" @cancel="defaultProps.close()">
                                <p class="leading-tight">
                                  Are you sure you want to delete this instruction? This action cannot be undone!
                                </p>
                              </confirm-delete>
                            </info-section>
                          </template>
                        </modal-dialog>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6" v-else>
            <p class="leading-none">No guests found!</p>
          </div>
        </div>
        <div v-else>
          <loading-dots :progress="checkedInGuestsReq.progress" :message="checkedInGuestsReq.message"></loading-dots>
        </div>
      </template>
    </info-section>
  </div>
</template>
<script setup>
// import AddGuest from './AddGuest.vue';
// import CreatePref from '@/vue/client/guest-profiles/preferences/CreatePref.vue';
// import EditPref from '@/vue/client/guest-profiles/preferences/EditPref.vue';
import { ref, reactive, onMounted, inject } from 'vue';
import { useApi } from '@/services/api.js';

let props = defineProps([
  'checkInId',
  'checkIn'
]);

let userAbilities = inject('userAbilities');

let checkedInGuests = ref([]);
let checkedInGuestsReq = reactive(useApi());
let removeReq = reactive(useApi());
let deletePrefReq = reactive(useApi());

function getGuests() {
  checkedInGuestsReq.send(
    `/api/client/v1/check-ins/${props.checkInId}/guests`
  )
  .then (res => {
    if (res) {
      checkedInGuests.value = res.guests;
    }
  });
}

function onGuestAdded(handle, data) {
  handle.close();
  getGuests();
}

function onGuestRemovalConfirmed(guest, dialogProps) {
  removeReq.send(
    `/api/client/v1/check-ins/${props.checkIn.id}/guests/${guest.id}`,
    'DELETE', 
  )
  .then (res => {
    if (res) {
      dialogProps.close();
      getGuests();
    }
  });
}

function onPrefCreated(dialog, e) {
  dialog.close();
  getGuests();
}

function onPrefUpdated(dialog, e) {
  dialog.close();
  getGuests();
}

function deletePref(dialog, guest, pref) {
  deletePrefReq.send(
    `/api/client/v1/guests/${guest.id}/guest-prefs/${pref.id}`,
    'DELETE'
  )
  .then (res => {
    if (res) {
      getGuests()
      dialog.close();
    }
  });
}

onMounted(() => {
  getGuests();
});
</script>