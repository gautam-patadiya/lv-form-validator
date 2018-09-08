<template>
	<div>
		<center>
			<h1>Welcome</h1>
			<form @submit.prevent="sendForm" autocomplete="off" class="was-validated">
				<div class="row">
					<div class="col-sm-3"></div><!-- /.col-sm-3 -->
					<div class="col-sm-6">
						<div class="form-group">
							<label for="title"> Title<span class="text-danger">*</span></label>
							<input type="text" name="title" class="form-control" v-model="form.$fields.title" id="title" autocorrect="off" />
							<div  v-if="form.$errors.has('title')" id="titleHelp" class="text-danger"> 
								<small v-for="error in form.$errors.get('title')">
									<div>{{error}}</div> 
								</small> 
							</div><!-- /#titleHelp -->
						</div><!-- /.form-group -->
						<div class="form-group">
							<label for="fileOne"> File Upload<span class="text-danger">*</span></label>
							<input type="file" id="fileUploadOne" class="fileUploadOne"/>
							<div v-if="form.$errors.has('fileOne')" id="fileOneHelp" class="text-danger"> 
								<div>{{form.$errors.first('fileOne')}}</div> 
							</div><!-- /#titleHelp -->
						</div><!-- /.form-group -->
						<input type="submit" value="Submit" class="btn btn-sm"/>
					</div><!-- /.col-sm-6 -->
				</div><!-- /.row -->
			</form><!-- /.was-validated -->
		</center>
	</div>
</template>

<script>
import Vue from 'vue';
import LVFormValidator from '../classes/LVFormValidator';
Vue.use(LVFormValidator);

export default {
	name: 'app',
	data () {
		return {
			form: this.$form({
				title: 'hello',
				fileOne: '.fileUploadOne', // Element By class Selector
				// fileOne: '#fileUploadOne', // Element By id Selector
			})
		}
  	},
	methods: {
		sendForm(){
			this.form.post('http://example.sr/myajax').then((response) => {
				
			}, (response) => {
				
			});

			console.log('End Submit');
		}
	}
}
</script>