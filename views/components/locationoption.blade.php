<option
	@if(isset($mode) && $mode=='edit' && $location->id == $product->location_id)
		selected="selected"
	@endif
	data-is-freezer="{{ $location->is_freezer }}"
	data-is-fridge="{{ $location->is_fridge }}"
	value="{{ $location->id }}">{{ $location->name }}@if($location->is_freezer) ({{ $__t('Freezer') }})@elseif($location->is_fridge) ({{ $__t('Fridge') }})@endif
</option>
