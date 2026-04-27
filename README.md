# CSTPISO Redirect

Pacote minimo para publicar um segundo GitHub Pages com o dominio `cstpiso.com.br` e redirecionar tudo para `https://www.granilpiso.com.br` sem o alerta de certificado do Registro.br.

## O que este pacote faz

- `index.html`: redireciona a raiz do dominio.
- `404.html`: captura caminhos inexistentes no GitHub Pages e redireciona preservando caminho, query e hash.
- `redirect.js`: monta a URL final de destino.
- `CNAME`: define `cstpiso.com.br` como dominio customizado do segundo site.

## Como publicar

1. Crie um novo repositorio publico no GitHub para esse redirect.
2. Copie o conteudo desta pasta para a raiz do novo repositorio.
3. Faça push para a branch `main`.
4. Ative o GitHub Pages em `Settings > Pages`, publicando `main` na pasta raiz.
5. Confirme que o dominio customizado ficou como `cstpiso.com.br`.
6. Aguarde o GitHub emitir o certificado e habilite `Enforce HTTPS`.

## DNS no Registro.br

Depois que a troca para DNS avancado ou externo estiver liberada, substitua o redirecionamento basico atual por estes registros:

### Apex `cstpiso.com.br`

- `A` -> `185.199.108.153`
- `A` -> `185.199.109.153`
- `A` -> `185.199.110.153`
- `A` -> `185.199.111.153`
- `AAAA` -> `2606:50c0:8000::153`
- `AAAA` -> `2606:50c0:8001::153`
- `AAAA` -> `2606:50c0:8002::153`
- `AAAA` -> `2606:50c0:8003::153`

### `www.cstpiso.com.br`

- `CNAME` -> `DANIELARANTESZDF.github.io`

## Resultado esperado

- `https://cstpiso.com.br` abre com certificado valido.
- `https://www.cstpiso.com.br` abre com certificado valido.
- Ambos redirecionam imediatamente para `https://www.granilpiso.com.br`.