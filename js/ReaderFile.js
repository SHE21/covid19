var urls = 'https://jsonplaceholder.typicode.com/posts/1';


function lerArquivo(nome, callback)
{
    var req = new XMLHttpRequest();
    req.open("GET", nome, false);
    req.onreadystatechange = function ()
    {
        if(req.readyState === 4)
        {
            //verifica se a requisição foi bem sucedida
            if(req.status === 200 || req.status == 0)
            {
                callback(req.responseText);
            }
        }
    }
    req.send(null);
}

function fazerRequest(url){
  lerArquivo(url, logarNoConsole);
}

function logarNoConsole(conteudo) { console.log(conteudo); }

fazerRequest(urls);