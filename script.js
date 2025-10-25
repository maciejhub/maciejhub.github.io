
// ignore this pls
if (document.getElementById("unrelated")) {
  document.getElementById("unrelated").style.display = "none";
}
          let url = window.location.href;
          function pokazSkrypt() {
            if (document.getElementById("script")) {
  var x = document.getElementById("script");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
            }
}

    function wiersz() {
      window.location.href = 'wiersz';
    }
        function gry() {
      window.location.href = 'gry';
    }
        function extra() {
      window.location.href = 'extra';
    }
            function wideo() {
      window.location.href = 'wideo';
    }
            function audio() {
      window.location.href = 'audio';
    }

    function maciejchange() {
      if (document.getElementById("peepa")) {
        document.getElementById("peepa").style.display = "initial";
        document.getElementById("peepa").src = "https://turbowarp.org/917935249/embed?addons=pause";
      }
    }
        function gardenchange() {
          if (document.getElementById("peepa")) {
           document.getElementById("peepa").style.display = "initial";
      document.getElementById("peepa").src = "https://growagardenstock.org/";
          }
    }
            function tycoonchange() {
              if (document.getElementById("peepa")) {
               document.getElementById("peepa").style.display = "initial";
      document.getElementById("peepa").src = "https://turbowarp.org/1182391153/embed?addons=pause";
              }
    }
          function deletechange() {
            if (document.getElementById("peepa")) {
      document.getElementById("ohiframe").style.display = "none";
            }
    }
  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
