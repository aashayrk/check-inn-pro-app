import { createApp } from 'vue'
import { router } from './router/index.js';
import './style.css'
import App from './App.vue'

// global components
import DropdownMenu from '@/components/DropdownMenu.vue';
import ModalDialog from '@/components/ModalDialog.vue';
import InfoSection from '@/components/InfoSection.vue';
import ApiRequest from '@/components/ApiRequest.vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue';
import MsrIcon from '@/components/MsrIcon.vue';
import AutocompleteMenu from '@/components/AutocompleteMenu.vue';
import SubTitle from '@/components/SubTitle.vue';
import DataList from '@/components/DataList.vue';
import FieldError from '@/components/FieldError.vue';
import LoadingDots from '@/components/LoadingDots.vue';
import ToggleSection from '@/components/ToggleSection.vue';
import SimpleToggle from '@/components/SimpleToggle.vue';
import PreviewDocument from '@/components/PreviewDocument.vue';
import Page from '@/components/layout/Page.vue';
import PageTopbar from '@/components/layout/PageTopbar.vue';

const app = createApp(App);

app.component('DropdownMenu', DropdownMenu);
app.component('ModalDialog', ModalDialog);
app.component('InfoSection', InfoSection);
app.component('ApiRequest', ApiRequest);
app.component('ConfirmDelete', ConfirmDelete);
app.component('MsrIcon', MsrIcon);
app.component('AutocompleteMenu', AutocompleteMenu);
app.component('SubTitle', SubTitle);
app.component('DataList', DataList);
app.component('FieldError', FieldError);
app.component('LoadingDots', LoadingDots);
app.component('ToggleSection', ToggleSection);
app.component('SimpleToggle', SimpleToggle);
app.component('PreviewDocument', PreviewDocument);
app.component('Page', Page);
app.component('PageTopbar', PageTopbar);

app.use(router);
app.mount('#app');
