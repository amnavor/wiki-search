$(document).ready(function() {

  var html = "<br>";

  function go() {
    //refresh results
    $("#results").empty();
    html = "<br>";
    // //make search readable with dashes instead of spaces
    var search = $('#search').val();
    //retrieve info from wikipedia
    $.ajax({
      url: "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=15&search=" + search,
      jsonp: "callback",
      dataType: "jsonp",
      success: function(set) {
        if (set[1].length==0) {
        html = "<h4> <i>" + search + "</i> did not match any results.  Please try again. </h4>";
        } else {
          for (var i = 0; i < set[1].length; i++) {
          html += '<div class = "entry"><a href=' + set[3][i] + ' target="_blank">';
    html += "<h4>" + set[1][i] + "</h4><p>" + set[2][i] + "<br></p>";
    html += "</a></div><br>";
        } 
      }
      $("#results").append(html);
      }
    });
  }

  //if you press go or enter
  $("#go").on("click", function() {
    go();
  });

  $("#search").keyup(function(event) {
    if (event.keyCode == 13) {
      go();
    }
  });

});