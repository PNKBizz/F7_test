<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="Left Panel" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
          <f7-nav-center sliding>My test app</f7-nav-center>
        </f7-navbar>
        <!-- Pages -->
        <f7-pages>
          <f7-page>
            <!-- Page Content -->
            <f7-block-title>My test app</f7-block-title>
            <f7-block inner>
              <p>To find photos, please enter tags, separated with comma.</p>
              <f7-list form>
                <f7-list-item>
                  <f7-label>Tags</f7-label>
                  <f7-input type="text" placeholder="Enter tags here" v-model="tags" reqire></f7-input>
                </f7-list-item>
              </f7-list>
              <f7-button @click="search">Search photos</f7-button>
            </f7-block>
            <f7-block inner>
              <f7-list media-list>
                <f7-list-item v-for="photo in photos"
                              :title="photo.title"
                              :key="photo.id"
                              @click="showPhoto(photo)"
                              :media="`<img src='https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg'>`"></f7-list-item>
              </f7-list>
            </f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>

    <!-- Popup -->
    <f7-popup :opened="popupIsOpen">
      <f7-view navbar-fixed>
        <f7-pages>
          <f7-page>
            <f7-navbar title="Full Size">
              <f7-nav-right>
                <f7-link @click="popupIsOpen = false">Close</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>
              <img :src=fullsizeLink class="popup-img">
            </f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-popup>

    <f7-popup :opened="errorPopupIsOpen">
      <f7-view navbar-fixed>
        <f7-pages>
          <f7-page>
            <f7-navbar title="Error Popup">
              <f7-nav-right>
                <f7-link @click="errorPopupIsOpen = false">Close</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>
              <p>{{errorMsg}}</p>
            </f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-popup>

  </div>
</template>

<script>
export default {
	data() {
	  return {
	  	tags: '',
        photos: [],
        popupIsOpen: false,
        errorPopupIsOpen: false,
        fullsizeLink: '',
        errorMsg: ''
      }
    },
	methods: {
		search() {
			if (!this.tags.length) return;
			const tagsForSearch = this.tags.replace(/\s/g, '').split(',');
			this.$http.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1d893a568613858d9ae8e47b279e83e0&tags=${tagsForSearch.join('+')}&format=json&nojsoncallback=1`).then(response => {
				console.log(response);
				this.photos = response.body.photos.photo
            }).catch(err => {
				this.errorPopupIsOpen = true;
				this.errorMsg = 'Something went wrong';
            })
        },
		showPhoto(photo) {
			this.popupIsOpen = true;
			this.fullsizeLink = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
        }
    }
}
</script>

<style>
  .popup-img {
    width: 100%;
    object-fit: contain;
  }
</style>