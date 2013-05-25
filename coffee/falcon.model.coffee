#==============================================================================================
#
# Class: Falcon.Model
#
#==============================================================================================
class Falcon.Model extends Falcon.Class
	#--------------------------------------------------------
	# Method: Falcon.Model.extend()
	#	static method used to replicate inhertiance in
	#	javascript applications.  Used to create a new
	#	model that inherits from the base Falcon.Model
	#
	# Arguments:
	#	**properties** _(Object)_ -  The new class definition
	#
	# Returns:
	#	_(Object)_ - The new class definition
	#--------------------------------------------------------
	@extend = (properties) -> Falcon.Class.extend(Falcon.Model, properties)

	#--------------------------------------------------------
	# Member: Falcon.Model#id
	#	This is the serve's id of this model.  This value will be converted
	#	to an observable (keeping the same value) once this model is 
	#	instantiated.
	#--------------------------------------------------------
	id: null

	#--------------------------------------------------------
	# Member: Falcon.Model#url
	#	This is the top level url for the model.
	#--------------------------------------------------------
	url: null

	#--------------------------------------------------------
	# Member: Falcon.Model#parent
	#	This represents the 'parent' object that holds this
	#	model.  Generally this is used for determining the URL
	#	structure of rest objects in the makeURL() routine.
	#	This should also be a Model.
	#
	# Type: Falcon.Model
	#--------------------------------------------------------
	parent: null

	#--------------------------------------------------------
	# Method: Falcon.Model()
	#	The constructor for a model
	#
	# Arguments:
	#	**models** _(Object)_ - An object of data to initialize this model with
	#	**parent** _(Falcon.Model)_ - The parent object of this collection
	#--------------------------------------------------------
	constructor: (data, parent) ->
		super()
		
		data = ko.utils.unwrapObservable( data )
		parent = ko.utils.unwrapObservable( parent )

		[parent, data] = [data, parent] if parent? and not Falcon.isModel( parent ) and Falcon.isModel( data )
		[parent, data] = [data, parent] if not parent? and Falcon.isModel( data )

		data = data.unwrap() if Falcon.isModel(data)

		@parent = parent
		@initialize(data)
		@fill(data) unless isEmpty( data )

		return this
	#END constructor

	#--------------------------------------------------------
	# Method: Falcon.Model#initialize()
	#	The psuedo-constructor of the model.  Useful for ensuring that
	#	the base constructor is called (in the correct spot) without 
	#	having to explicitly call the native Model constructor
	#
	# Arguments:
	#	**data** _(Object)_ - The initial data to load in
	#--------------------------------------------------------
	initialize: (data) ->
	#END initialize

	#--------------------------------------------------------
	# Method: Falcon.Model#get()
	#	Gets am observable-less value for a specific key
	#
	# Arguments:
	#	**key** _(string)_ - The key to look up
	#
	# Returns:
	#	_(mixed)_ - The unwrapped value at the specific key
	#--------------------------------------------------------
	get: (key) ->
		return @undefined unless isString( key )
		return ko.utils.unwrapObservable( @[key] )
	#END get

	#--------------------------------------------------------
	# Method: Falcon.Model#set()
	#	Sets a value for the specific key, creating one if it does nto exist
	#
	# Arguments:
	#	**key** _(string)_ - The key to look up
	#	**value** -(mixed)_ - The value to assign
	#
	# Arguments:
	#	**key** _(Object)_ - An object of values to set
	#
	# Returns:
	#	_(Falcon.Model)_ - This Model
	#--------------------------------------------------------
	set: (key, value) ->
		if isObject( key )
			@set(k, v) for k, v of key
			return this
		#END if
		
		return this unless isString( key )
		
		if ko.isObservable( @[key] )
			@[key](value)
		else
			@[key] = value
		#END if

		return this
	#END set

	#--------------------------------------------------------
	# Method: Falcon.Model#toggle()
	#	Toggles the value between true/false on the specific key
	#
	# Arguments:
	#	**key** _(string)_ - The key to look up
	#
	# Returns:
	#	_(mixed)_ - The unwrapped value at the specific key
	#--------------------------------------------------------
	toggle: (key) ->
		return @set(key, not @get(key) )
	#END toggle

	#----------------------------------------------------------------------------------------------
	# Method: Falcon.Model#parse()
	#	parses the response data from an XHR request
	#
	# Arguments:
	#	**data** _(Object)_ - The xhr response data
	#	**options** _ - The options fed initially into the XHR request
	#	**xhr** _(Object)_ - The XHR object
	#
	# Returns:
	#	_Object_ - Parsing on a model expects an object to be returned
	#----------------------------------------------------------------------------------------------
	parse: (data, options, xhr) ->
		return data
	#END parse

	#--------------------------------------------------------
	# Method: Falcon.Model#fill()
	#	Method used to 'fill in' and add data to this model
	#
	# Arguments:
	#	**data** _(Object)_ - The data to fill
	#
	# Returns:
	#	_(Falcon.Model)_ - This instance
	#--------------------------------------------------------
	fill: (data) ->
		data = {'id': data} if isNumber(data) or isString(data)
		return this unless isObject(data)
		data = data.unwrap() if Falcon.isModel(data)
		return this if isEmpty( data )

		rejectedAttributes = {}
		for attr, value of Falcon.Model.prototype when attr not in ["id", "url"]
			rejectedAttributes[attr] = true
		#END for

		#Fill in the attributes unless they're attempting to override
		#core functionality
		for attr, value of data when not rejectedAttributes[attr]
			value = ko.utils.unwrapObservable( value )
			
			if Falcon.isModel(this[attr])
				this[attr].fill(value) unless isEmpty( value )
			
			else if Falcon.isCollection(this[attr])
				this[attr].fill(value)
			
			else if ko.isWriteableObservable(this[attr])
				this[attr](value)
			
			else
				this[attr] = value
			#END if
		#END for

		return this
	#END fill

	#--------------------------------------------------------
	# Method: Falcon.Model#unwrap()
	#	Method used to 'unwrap' this object into a raw object
	#	Needed to cascade inwards on other Falcon Data objects (like lists)
	#	to unwrap newly added member variables/objects
	#
	# Returns
	#	_(Object)_ - The 'unwrapped' object
	#--------------------------------------------------------
	unwrap: () ->
		unwrapped = {}

		for attr of this when ( attr is "id" or not Falcon.Model.prototype[attr]? )
			value = this[attr]
			unwrapped[attr] = if Falcon.isDataObject(value) then value.unwrap() else value
		#END for

		return unwrapped
	#END unwrap

	#--------------------------------------------------------
	# Method: Falon.Model#serialize()
	#	Serializes the data into a raw json object and only corresponds to the attributes
	#	that are primitive and that we wish to be able to send back to the server
	#
	# Arguments:
	#	**attributes** _(Araay)_ -	The attributes that should be included in the 
	#	                      		serialization "id" is always included. If 
	#	                      		none given, all attributes from this models 'attributes' 
	#	                      		member are serialized
	#
	# Returns:
	#	_(Object)_ - The resultant 'raw' object to send to the server
	#--------------------------------------------------------
	serialize: (attributes) ->
		serialized = {}

		unless attributes?
			attributes = ( attr for attr of this when ( attr is "id" or not ( attr of Falcon.Model.prototype ) ) )
		else if isString( attributes )
			attributes = trim(attributes).split(",")
		#END unless

		if isArray( attributes )
			new_attributes = {}
			new_attributes[attr] = null for attr in attributes
			attributes = new_attributes
		#END if
		
		return serialized unless isObject( attributes )

		for attr, sub_attributes of attributes
			value = this[attr]

			if Falcon.isDataObject(value)
				serialized[attr] = value.serialize(sub_attributes)
			else if ko.isObservable(value)
				serialized[attr] = ko.utils.unwrapObservable( value )
			else if not isFunction(value)
				serialized[attr] = value
			#END if
		#END for

		return serialized
	#END serialize
		
	#--------------------------------------------------------
	# Method: Falcon.Model#makeURL()
	#	generates a URL based on this model's url, the parent model of this model, 
	#	the type of request we're making and Falcon's defined baseApiUrl
	#
	# Arguments:
	#	**type** _(string)_ - The type of request we're making (GET, POST, PUT, DELETE)
	#
	# Returns:
	#	_String_ - The generated URL
	#--------------------------------------------------------
	makeUrl: (type, parent) ->
		url = if isFunction(@url) then @url() else @url
		url = "" unless isString(url)
		url = trim(url)

		type = "" unless isString(type)
		type = type.toUpperCase()
		type = 'GET' unless type in ['GET', 'PUT', 'POST', 'DELETE']

		parent = if parent isnt undefined then parent else @parent

		ext = ""
		periodIndex = url.lastIndexOf(".")

		#Split on the extension if it exists
		if periodIndex > -1
			ext = url.slice(periodIndex)
			url = url.slice(0, periodIndex)
		#END if

		#Make sure the url is now formatted correctly
		url = "/#{url}" unless startsWith(url, "/")

		#Check if a parent model is present
		if Falcon.isModel(parent)
			parentUrl = parent.makeUrl()
			parentPeriodIndex = parentUrl.lastIndexOf(".")
			parentSlashIndex = parentUrl.lastIndexOf("/")

			if parentSlashIndex < parentPeriodIndex
				parentUrl = parentUrl.slice(0, parentPeriodIndex) if parentPeriodIndex > -1
				parentUrl = trim(parentUrl)
			#END if

			url = "#{parentUrl}#{url}"

		#Otherwise consider this the base
		else if isString(Falcon.baseApiUrl)
			url = "#{Falcon.baseApiUrl}#{url}"

		#END if

		#Append the id if it exists
		if type in ["GET", "PUT", "DELETE"]
			url += "/" unless url.slice(-1) is "/"
			url += ko.utils.unwrapObservable( @id )
		#END if

		#Replace any double slashes outside of the initial protocol
		url = url.replace(/([^:])\/\/+/gi, "$1/")

		#Return the built url
		return "#{url}#{ext}"
	#END makeUrl

	#--------------------------------------------------------
	# Method: Falcon.Model#validate()
	#	Method used to validate this model before it is sent
	#	to the server on create or save.  If this method returns
	#	true, saving will continue but if it returns false then
	#	saving is halted
	#
	# Arguments:
	#	**options** _(Object)_ - The options passed into the sync method
	#
	# Returns:
	#	_(Boolean)_ - Is this model valid?
	#--------------------------------------------------------
	validate: (options) ->
		return true
	#END validate

	#--------------------------------------------------------
	# Method: Falcon.Model#sync()
	#	Used to dynamically place calls to the server in order
	#	to create, update, destroy, or read this from/to the
	#	server
	#
	# Arguments:
	#	**type** _(String)_ - The HTTP Method to call to the server with
	#	**options** _(Object)_ - Optional object of settings to use on this call
	#
	# Returns:
	#	_(XmlHttpRequest)_ - The XmlHttpRequest created
	#--------------------------------------------------------
	sync: (type, options) ->
		options = {complete: options} if isFunction(options)
		options = {attributes: trim( options ).split(",")} if isString(options)
		options = {attributes: options} if isArray( options )

		options = {} unless isObject(options)
		options.data = null unless isObject(options.data)
		options.dataType = "json" unless isString(options.dataType)
		options.contentType = "application/json" unless isString(options.contentType)
		options.success = (->) unless isFunction(options.success)
		options.complete = (->) unless isFunction(options.complete)
		options.error = (->) unless isFunction(options.error)
		options.parent = @parent unless Falcon.isModel(options.parent)
		options.attributes = null unless options.attributes?
		options.params = {} unless isObject( options.params ) 
		options.fill = true unless isBoolean( options.fill )
		options.headers = {} unless isObject( options.headers )

		type = trim( if isString(type) then type.toUpperCase() else "GET" )
		type = "GET" unless type in ["GET", "POST", "PUT", "DELETE"]
		options.type = type

		return if type in ["PUT", "POST"] and not @validate(options)

		if options.data is null and type in ["POST", "PUT"]
			options.data = @serialize( options.attributes )
		#END if

		#serialize the data to json
		json = if options.data is null then "" else JSON.stringify(options.data)

		#Determine the context
		context = options.context ? this

		url = options.url ? @makeUrl(type, options.parent)

		unless isEmpty( options.params )
			url += "?" unless url.indexOf("?") > -1
			url += ( "#{key}=#{value}" for key, value of options.params ).join("&")
		#END if params

		return $.ajax
			'type': type
			'url': url
			'data': json
			'dataType': options.dataType
			'contentType': options.contentType
			'cache': Falcon.cache
			'headers': options.headers

			'success': (data, status, xhr) =>
				data = JSON.parse( data ) if isString( data )
				data = JSON.parse( xhr.responseText ) if not data? and isString( xhr.responseText )
				data ?= {}

				data = @parse( data, options, xhr )

				@fill(data, options) if options.fill

				switch type
					when "GET" then @trigger("fetch", data)
					when "POST" then @trigger("create", data)
					when "PUT" then @trigger("save", data)
					when "DELETE" then @trigger("destroy", data)
				#END switch

				options.success.call(context, this, data, status, xhr)
			#END success

			'error': (xhr) => 
				response = xhr.responseText
				try
					response = JSON.parse(response) if isString(response)
				catch e

				options.error.call(context, this, response, xhr)
			#END error

			'complete': (xhr, status) =>
				options.complete.call(context, this, xhr, status)
			#END complete
		#END $.ajax
	#END sync

	#--------------------------------------------------------
	# Method: Falcon.Model#fetch()
	#	Calls the sync method with 'GET' as the default type
	#	server. Get's this model's server data.
	#
	# Arguments:
	#	**options** _(Object)_ - Optional object of settings to use on this call
	#
	# Returns:
	#	_(XmlHttpRequest)_ - The XmlHttpRequest created
	#--------------------------------------------------------
	fetch: (options) -> 
		return @sync('GET', options)
	#END fetch

	#--------------------------------------------------------
	# Method: Falcon.Model#create()
	#	Calls the sync method with 'POST' as the default type
	#	server. Creates a new version of this model.
	#
	# Arguments:
	#	**options** _(Object)_ - Optional object of settings to use on this call
	#
	# Returns:
	#	_(XmlHttpRequest)_ - The XmlHttpRequest created
	#--------------------------------------------------------
	create: (options) -> 
		return @sync('POST', options)
	#END create

	#--------------------------------------------------------
	# Method: Falcon.Model#save()
	#	Calls the sync method with 'PUT' as the default type
	#	server. Saves this model to the server.  If the model
	#	is new then create() will be called instead
	#
	# Arguments:
	#	**options** _(Object)_ - Optional object of settings to use on this call
	#
	# Returns:
	#	_(XmlHttpRequest)_ - The XmlHttpRequest created
	#--------------------------------------------------------
	save: (options) -> 
		return ( if @isNew() then @create(options) else @sync('PUT', options) )
	#END save

	#--------------------------------------------------------
	# Method: Falcon.Model#destroy()
	#	Calls the sync method with 'DELETE' as the default type
	#	server.  Deletes this model from the server.
	#
	# Arguments:
	#	**options** _(Object)_ - Optional object of settings to use on this call
	#
	# Returns:
	#	_(XmlHttpRequest)_ - The XmlHttpRequest created
	#--------------------------------------------------------
	destroy: (options) -> 
		return @sync('DELETE', options)
	#END destroy

	#--------------------------------------------------------
	# Method: Falcon.Model#equals()
	#	Determines if this model is equivalent to the input value
	#
	# Arguments 1:
	#	**model** _(Falcon.Model)_ - Is this model the same as the one given, based on id
	#
	# Arguments 2:
	#	**id** _(Number)_ - Treated as an id, checked against this id
	#
	# Returns:
	#	_(Boolean)_ - Are these equal?
	#--------------------------------------------------------
	equals: (model) ->
		model = ko.utils.unwrapObservable( model )

		if Falcon.isModel( model )
			return model.get("id") is @get("id")
		else if isNumber( model ) or isString( model )
			return model is @get("id")
		#END if

		return false
	#END equals


	#--------------------------------------------------------
	# Method: Falcon.Model#mixin()
	#	Maps extra atributes and methods onto this model for use
	#	later, mostly in Falcon views. Will ensure that any method
	#	that is not a knockout observable will be called in the
	#	context of this model as well as pass this model in as
	#	the first argument, pushing the other arguments down the
	#	list.
	# 
	# Arguments:
	#	**mapping** _(Object)_ - The mapping to augment this model with
	#
	# Returns:
	#	_(Falcon.Model)_ - This model
	#
	# TODO:
	#	Have observables check for 'extends' method
	#--------------------------------------------------------
	mixin: (mapping) ->
		mapping = {} unless isObject(mapping)

		for key, value of mapping
			if Falcon.isDataObject( this[key] )
				this[key].mixin(value)
			else 
				if ko.isObservable(value)
					this[key] = ko.observable( ko.utils.unwrapObservable(value) )
				else if isFunction(value)
					do =>
						_value = value
						this[key] = (args...) => 
							_value.call(this, this, args...) 
						#END
					#END do
				else
					this[key] = value 
				#END if
			#END if
		#END for

		return this
	#END mixin

	#--------------------------------------------------------
	# Method: Falcon.Model#clone()
	#	Method used to deeply clone this model
	#
	# Arguments:
	#	**parent** _(Falcon.Model)_ - The parent of the clone. optional
	#
	# Returns:
	#	_Falcon.Model_ - A clone of this model
	#
	# TODO:
	#	Add deep cloning
	#--------------------------------------------------------
	clone: (parent) ->
		parent = if parent? or parent is null then parent else @parent
		return new @constructor(this.unwrap(), parent )
	#END clone

	#--------------------------------------------------------
	# Method: Falcon.Model#copy()
	#	Method used to copy this model
	#
	# Arguments:
	#	**attributes** _(Array)_ - A list of attributes to copy.
	#	**parent** _(Object)_ - The parent to set on the new model, use 
	#							'null' to unset the parent.
	#
	# Returns:
	#	_(Falcon.Model)_ - A copy of this model
	#--------------------------------------------------------
	copy: (attributes, parent) ->
		parent = attributes if attributes is null or Falcon.isModel( attributes )
		attributes = {"id":null} unless attributes?
		parent = @parent unless parent is null or Falcon.isModel( parent )
		return new @constructor( @serialize( attributes ), parent )
	#END copy

	#--------------------------------------------------------
	# Method: Falcon.Model#isNew()
	#	Method used to check if this model is new or is from the server.  Based on id.
	#
	# Returns:
	#	_(Boolean)_ - Is this a new model?
	#--------------------------------------------------------
	isNew: ->
		return ( not @get("id")? )
	#END isNew
#END Falcon.Model
