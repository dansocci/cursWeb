var rodada = 1;
var jogada = 1;
var deuVelha = true;
var matrizJogo = Array(3);
var scoreJogador1 = 0;
var scoreJogador2 = 0;

matrizJogo['a'] = Array(3);
matrizJogo['b'] = Array(3);
matrizJogo['c'] = Array(3);

matrizJogo['a'][1] = 0;
matrizJogo['a'][2] = 0;
matrizJogo['a'][3] = 0;

matrizJogo['b'][1] = 0;
matrizJogo['b'][2] = 0;
matrizJogo['b'][3] = 0;

matrizJogo['c'][1] = 0;
matrizJogo['c'][2] = 0;
matrizJogo['c'][3] = 0;

$(document).ready(function(){

    $('#selecao1').css('border','solid 4px red');

    $('#btn-iniciar').click(function(){
        
        //Validação de preenchimento de apelidos
        if($('#apelidoJogador1').val()==''){
            alert('Preencher apelido jogador 1.');
            return false;
        }
        if($('#apelidoJogador2').val()==''){
            alert('Preencher apelido jogador 2.');
            return false;
        }
        //Exibir nome dos jogadores
        $('.nomeJogador1').html($('#apelidoJogador1').val());
        $('.nomeJogador2').html($('#apelidoJogador2').val());

        //Mostrar placar geral
        $('.pontosJogador1').html(scoreJogador1).val();
        $('.pontosJogador2').html(scoreJogador2).val();

        //Visualização da tela
        $('#paginaInicial').hide();
        $('#palcoJogo').show();
    })

    $('.campo').click(function(){
        var campoClicado = this.id; 
        $('#'+campoClicado).css('pointer-events', 'none');
        campo(campoClicado);
    });

    function campo(id){ //Jogada
        var icone = '';
        var ponto = 0;

        if((rodada % 2) == 1){
            icone = 'url("imagens/marcacao_1.png")';
            ponto = -1;
            $('#selecao2').css('border','solid 4px blue');
            $('#selecao1').css('border','none');
        } else{
            icone = 'url("imagens/marcacao_2.png")';
            ponto = 1;
            $('#selecao2').css('border','none');
            $('#selecao1').css('border','solid 4px red');
        }

        rodada++;
        jogada++;

        $('#'+id).css('background-image', icone);

        var linhaColuna = id.split('-');

        matrizJogo[linhaColuna[0]][linhaColuna[1]] = ponto;

        verificaCombinacao();
    
    }

    function verificaCombinacao(){

        //verificação horizontal
        var pontos = 0;
        for (var i = 1; i <= 3; i++){
            pontos = pontos + matrizJogo['a'][i];
        }
        ganhadorPontos(pontos);

        pontos = 0;
        for (var i = 1; i <= 3; i++){
            pontos = pontos + matrizJogo['b'][i];
        }
        ganhadorPontos(pontos);

        pontos = 0;
        for (var i = 1; i <= 3; i++){
            pontos = pontos + matrizJogo['c'][i];
        }
        ganhadorPontos(pontos);

        if(pontos < 3 && pontos > -3){

        //verificação na vertical
        for (var l = 1; l <= 3; l++){
            pontos = 0;
            pontos += matrizJogo['a'][l];
            pontos += matrizJogo['b'][l];
            pontos += matrizJogo['c'][l];

            ganhadorPontos(pontos);

        }}

        if (pontos < 3 && pontos > -3){

        //verificação diagonal
        pontos = 0;
        pontos = matrizJogo['a'][1] + matrizJogo['b'][2] + matrizJogo['c'][3];
        ganhadorPontos(pontos);

        pontos = 0;
        pontos = matrizJogo['a'][3] + matrizJogo['b'][2] + matrizJogo['c'][1];
        ganhadorPontos(pontos);

        if(jogada > 9 && deuVelha == true) {
            alert('Xiiiii, deu velha!!');
            novoJogo();
        }
    }}

    function ganhadorPontos(pontos){
        if(pontos == -3){
            alert($('#apelidoJogador1').val() + ' é o vencedor!');
            deuVelha = false;
            scoreJogador1++;
            novoJogo();
            
        }else if(pontos == 3){
            alert($('#apelidoJogador2').val() + ' é o vencedor!');
            deuVelha = false;
            scoreJogador2++;
            novoJogo();
        }
    }

    function novoJogo(){

        $('#gameOver').show();

        //Mostrar placar geral
        $('.pontosJogador1').html(scoreJogador1).val();
        $('.pontosJogador2').html(scoreJogador2).val();
        $('#palcoJogo').hide();

    }

    $('#btn-novaJogada').click(function(){

        //Limpa o tabuleiro
        matrizJogo['a'][1] = 0;
        matrizJogo['a'][2] = 0;
        matrizJogo['a'][3] = 0;

        matrizJogo['b'][1] = 0;
        matrizJogo['b'][2] = 0;
        matrizJogo['b'][3] = 0;

        matrizJogo['c'][1] = 0;
        matrizJogo['c'][2] = 0;
        matrizJogo['c'][3] = 0;

        jogada = 1;
        ponto = 0;
        deuVelha = true;

        $('.campo').css('background-image', '');

        //Aciona os campos
        $('.campo').css('pointer-events', '');

        //Mostra as telas
        $('#gameOver').hide();
        $('#palcoJogo').show();

    })

    $('#btn-reiniciar').click(function(){

        //Limpa o tabuleiro
        matrizJogo['a'][1] = 0;
        matrizJogo['a'][2] = 0;
        matrizJogo['a'][3] = 0;

        matrizJogo['b'][1] = 0;
        matrizJogo['b'][2] = 0;
        matrizJogo['b'][3] = 0;

        matrizJogo['c'][1] = 0;
        matrizJogo['c'][2] = 0;
        matrizJogo['c'][3] = 0;

        icone = '';
        rodada = 1;
        jogada = 1;
        ponto = 0;
        deuVelha = true;
        $('.campo').css('background-image', icone);

        //Reseta o score
        scoreJogador1 = 0;
        scoreJogador2 = 0;

        //Aciona os campos
        $('.campo').css('pointer-events', '');

        //Reseta os nomes
        document.getElementById("apelidoJogador1").value = "";
        document.getElementById("apelidoJogador2").value = "";
        $('#selecao1').css('border','solid 4px red');
        $('#selecao2').css('border','none');

        $('#gameOver').hide();
        $('#paginaInicial').show();

    })

});