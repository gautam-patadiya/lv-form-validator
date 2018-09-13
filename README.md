# Laravel form validation with Vue.js 

Repository used to handle Laravel form validation with Vue.js. Plus point is File Upload Included. Special thanks to [MetinSeylan](https://github.com/MetinSeylan/Vue-Laravel-Validator) Laravel validation component. Much inspired from there.

**Install with NPM**

    npm i lv-form-validator --save--dev 

## Dependencies

 - Vue
 - Axios
 
 This package is using Axios to make ajax request. Also, behind the scene Vue.use() plugin is working. FormData class of JavaScript is helped to create form object with file upload.

## Example 

You can pass normal input element by v-model binding. But v-model not supports [file_input type](https://forum.vuejs.org/t/vuejs2-file-input/633). 

Here I used custom JavaScript selector to handle file Input type. ID or Class selector of input can be used here.

May example can help:
**Vue code:**

    import  LVFormValidator  from  'lv-form-validator';
    Vue.use(LVFormValidator);
    
    export default {
	    name: 'app',
    	data () {
    		return {
    			form: this.$form({
    				title: 'foo',
    				// fileOne: '.fileUploadOne', // Element By class Selector
    				// fileOne: '#fileUploadOne', // Element By id Selector
    			})
    		}
      	},
    	methods: {
    		sendForm(){
    			this.form.post('http://example.sr/myajax').then((response) => {
    				
    			}, (response) => {
    				
    			});
    		}
    	}
    }

Here is the **template** file: 

    <template>
    	<div>
    		<form @submit.prevent="sendForm" autocomplete="off">
    			<div class="row">
    			
    				<div class="col-sm-6">
    					<div class="form-group">
    						<label for="title">Title: </label>
    						<input type="text" name="title" class="form-control" v-model="form.$fields.title" id="title" autocorrect="off" />
    						<div  v-if="form.$errors.has('title')" id="titleHelp" class="text-danger"> 
    							<small v-for="error in form.$errors.get('title')">
    								<div>{{error}}</div> 
    							</small> 
    						</div><!-- /#titleHelp -->
    					</div><!-- /.form-group -->
    					
    					<div class="form-group">
    						<label for="picture">File Upload: </label>
    						<input type="file" id="picture" class="picture" />
    						<div v-if="form.$errors.has('picture')" id="pictureHelp" class="text-danger">
    							<div>{{form.$errors.first('fileOne')}}</div> 
    						</div><!-- /#firstHelp -->
    					</div><!-- /.form-group -->
    					
    					<input type="submit" value="Submit" class="btn btn-sm"/>
    				</div><!-- /.col-sm-6 -->
    			</div><!-- /.row -->
    		</form><!-- /form -->
    	</div>
    </template>
    
**Laravel Validations example:**

    public function store(Request $request){
        $this->validate($request, [
            'name' => 'required|min:3|max:32',
            'picture' => 'required|image',
        ]);
    }

## Available Properties
All properies are same as [here](https://github.com/MetinSeylan/Vue-Laravel-Validator#available-properties).  Here is one new property to get first message only.

| Title                     | Type    | Description                                                            |
| ------------------------- | ------- | ---------------------------------------------------------------------- |
| .$busy                    | Boolean | Flag will true when request sent and will false when request completed |
| .$errors.get({input})     | Array   | To get specific fields all errors                                      |
| .$errors.first({input})   | string  | To get specific fields first error                                     |
| .$errors.has({input})     | Boolean | To check error key is exist                                            |
| .$errors.all()            | Array   | To get all errors                                                      |
| .$fields.{input}          | Input   | To get raw input value (use in template)                               |
| .post(url)                | string  | To send Laravel POST Request                                           |
| .put(url)                 | string  | To send Laravel PUT Request                                            |
| .delete(url)              | string  | To send Laravel DELETE Request                                         |
| .get(url)                 | string  |  To send Laravel GET Request                                           |
| .patch(url)               | string  | To send Laravel PATCH Request                                          |

## Notes

 - Component with create FormData Object and then do request. Means it will use multipart/form-data with every ajax request.
 - With every request Component will default send _method parameter to indentify Laravel Routing Request. 
 - Plugin using FormData Class. And appends form inputs. When you send object as input it will parse into JSON.stringify() 

That's it. Plugin include Laravel 5.5 and Laravel 5.6 support.
