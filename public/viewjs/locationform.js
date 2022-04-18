$('#save-location-button').on('click', function(e)
{
	e.preventDefault();

	if (!Grocy.FrontendHelpers.ValidateForm("location-form", true))
	{
		return;
	}

	if ($(".combobox-menu-visible").length)
	{
		return;
	}

	var jsonData = $('#location-form').serializeJSON();
	Grocy.FrontendHelpers.BeginUiBusy("location-form");

	if (Grocy.EditMode === 'create')
	{
		Grocy.Api.Post('objects/locations', jsonData,
			function(result)
			{
				Grocy.EditObjectId = result.created_object_id;
				Grocy.Components.UserfieldsForm.Save(function()
				{
					if (GetUriParam("embedded") !== undefined)
					{
						window.parent.postMessage(WindowMessageBag("Reload"), Grocy.BaseUrl);
					}
					else
					{
						window.location.href = U('/locations');
					}
				});
			},
			function(xhr)
			{
				Grocy.FrontendHelpers.EndUiBusy("location-form");
				Grocy.FrontendHelpers.ShowGenericError('Error while saving, probably this item already exists', xhr.response)
			}
		);
	}
	else
	{
		Grocy.Api.Put('objects/locations/' + Grocy.EditObjectId, jsonData,
			function(result)
			{
				Grocy.Components.UserfieldsForm.Save(function()
				{
					if (GetUriParam("embedded") !== undefined)
					{
						window.parent.postMessage(WindowMessageBag("Reload"), Grocy.BaseUrl);
					}
					else
					{
						window.location.href = U('/locations');
					}
				});
			},
			function(xhr)
			{
				Grocy.FrontendHelpers.EndUiBusy("location-form");
				Grocy.FrontendHelpers.ShowGenericError('Error while saving, probably this item already exists', xhr.response)
			}
		);
	}
});

$('#location-form input').keyup(function(event)
{
	Grocy.FrontendHelpers.ValidateForm('location-form');
});

$('#location-form input').keydown(function(event)
{
	if (event.keyCode === 13) // Enter
	{
		event.preventDefault();

		if (!Grocy.FrontendHelpers.ValidateForm('location-form'))
		{
			return false;
		}
		else
		{
			$('#save-location-button').click();
		}
	}
});

$('#is_freezer').change(function(e)
{
	updateFridgeFreezer();
});

$('#is_fridge').change(function(e)
{
	updateFridgeFreezer();
});

function updateFridgeFreezer() {
	const fridge = document.getElementById("is_fridge").checked;
	const freezer = document.getElementById("is_freezer").checked;
	if (fridge) {
		$("#is_freezer").attr("disabled", "").removeAttr('checked');
	} else {
		$("#is_freezer").removeAttr("disabled");
	}
	if (freezer) {
		$("#is_fridge").attr("disabled", "").removeAttr('checked');
	} else {
		$("#is_fridge").removeAttr("disabled");
	}
}

Grocy.Components.UserfieldsForm.Load();
updateFridgeFreezer();
Grocy.FrontendHelpers.ValidateForm('location-form');
setTimeout(function()
{
	$('#name').focus();
}, 250);
