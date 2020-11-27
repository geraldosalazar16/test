$(document).ready( function () {

  function load() {
    $.ajax({
      url : 'http://localhost:3000/users/',
      type : 'GET',
      dataType : 'json',
      success : function(response) {
        response.forEach((element) => {
          var genter =  element.gender_id?element.gender_id:'';
          $('#allusers').append(
              "<tr><td>"+element.user_id+"</td>" +
              "<td>"+element.first_name+"</td>" +
              "<td>"+element.last_name+"</td>" +
              "<td>"+element.birthday+"</td>" +
              "<td>"+genter+"</td>" +
              "<td>"+element.createdAt+"</td>" +
              "<td>"+element.updatedAt+"</td>" +
              "<td><a class='btn btn-primary' href='/details/"+element.user_id+"'>Details</a></td></tr>"
          );

        })



      },
      error : function(xhr, status) {
        alert('Disculpe, existió un problema');
      }
    });
    function formatDate() {}
    // $('#select').append(" <div class=\"input-field col s12\">\n" +
    //     "    <select>\n" +
    //     "      <option value=\"\" disabled selected>Choose your option</option>\n" +
    //     "      <option value=\"1\">Option 1</option>\n" +
    //     "      <option value=\"2\">Option 2</option>\n" +
    //     "      <option value=\"3\">Option 3</option>\n" +
    //     "    </select>\n" +
    //     "    <label>Materialize Select</label>\n" +
    //     "  </div>")
  }


  $("#button_add").click( function()
  {
    var fname = $('#first_name').val();
    var lname = $('#last_name').val();
    var birthday = $('#birthday').val();
    birthday = new Date(birthday).toISOString();
    var gender = $('#gender').val();
    var password = $('#password').val();
    if(fname && lname && birthday && gender && password) {
      $.ajax({
        url : 'http://localhost:3000/users/',
        type : 'POST',
        data : { first_name : fname,last_name: lname, birthday, gender: Number(gender), password},
        dataType : 'json',
        success : function(response) {
          window.location = document.referrer;
        },
        error : function(xhr, status) {
          alert('Disculpe, existió un problema');
        },
        complete : function(xhr, status) {
          // alert('Petición realizada');
        }
      });
    }else {
      alert("campos vacios")
    }
  });


  $("#button_edit").click( function()
  {
    var fname = $('#first_name').val();
    var lname = $('#last_name').val();
    var birthday = $('#birthday').val();
    var gender = $('#gender').val();
    var password = $('#password').val();
    var id = $('#id').val();
    var url = 'http://localhost:3000/users/'+id
    var data = { "first_name" : fname,"last_name": lname, "birthday":birthday, "gender": Number(gender), "password":password}
    if(fname && lname && birthday && gender && password) {
      $.ajax({
        url ,
        type : 'PUT',
        data,
        dataType : 'json',
        success : function(response) {
          window.location = document.referrer;
        },
        error : function(xhr, status) {
          // history.back();
          window.location = document.referrer;
        },
        complete : function(xhr, status) {
          // alert('Petición realizada');
        }
      });
    }else {
      alert("campos vacios")
    }
  });
  $("#button_delete").click( function()
  {
    var r = confirm("Detele?");
    if (r == true) {
      var id = $('#id').val();
      var url = 'http://localhost:3000/users/'+id
      if(id) {
        $.ajax({
          url ,
          type : 'DELETE',
          success : function(response) {
            window.location = document.referrer;
          },
          error : function(xhr, status) {
            // history.back();
            window.location = document.referrer;
          },
          complete : function(xhr, status) {
            // alert('Petición realizada');
          }
        });
      }else {
        alert("ID empty");
      }
    }

  });
  load();
})



