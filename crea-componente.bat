@echo off
setlocal enabledelayedexpansion

:: Verificar que se ha pasado un argumento
if "%~1"=="" (
    echo Uso: create-component.bat ^<nuevo-componente^>
    exit /b 1
)

set NOMBRE_COMPONENTE=%~1

:: Crear carpetas para el nuevo componente
mkdir "src\modules\%NOMBRE_COMPONENTE%"
mkdir "src\modules\%NOMBRE_COMPONENTE%\store"
mkdir "src\modules\%NOMBRE_COMPONENTE%\router"
mkdir "src\modules\%NOMBRE_COMPONENTE%\views"

:: Copiar archivos
copy "src\modules\guias\sample\index.js" "src\modules\%NOMBRE_COMPONENTE%\index.js"
copy "src\modules\guias\sample\Module.vue" "src\modules\%NOMBRE_COMPONENTE%\Module.vue"
copy "src\modules\guias\sample\store\index.js" "src\modules\%NOMBRE_COMPONENTE%\store\index.js"
copy "src\modules\guias\sample\router\index.js" "src\modules\%NOMBRE_COMPONENTE%\router\index.js"
copy "src\modules\guias\sample\views\sampleHomeComponent.vue" "src\modules\%NOMBRE_COMPONENTE%\views\%NOMBRE_COMPONENTE%Component.vue"

:: Reemplazar #TEMPLATE# en todos los archivos
for /r "src\modules\%NOMBRE_COMPONENTE%" %%F in (*) do (
    powershell -Command "(Get-Content '%%F') -replace '#TEMPLATE#', '%NOMBRE_COMPONENTE%' | Set-Content '%%F'"
)

:: Modificar main.js
powershell -Command "(Get-Content src\main.js) -replace 'registerModules\({', 'registerModules({  %NOMBRE_COMPONENTE%: %NOMBRE_COMPONENTE%Module,' | Set-Content src\main.js"
powershell -Command "'import %NOMBRE_COMPONENTE%Module from ''@/modules/%NOMBRE_COMPONENTE%'';', (Get-Content src\main.js) | Set-Content src\main.js"

:: Modificar router/index.js
powershell -Command "'import %NOMBRE_COMPONENTE%Router from ''@/modules/%NOMBRE_COMPONENTE%/views/%NOMBRE_COMPONENTE%Component.vue'';', (Get-Content src\router\index.js) | Set-Content src\router\index.js"
powershell -Command "(Get-Content src\router\index.js) -replace 'routes:[', 'routes:[{ path:, name:%NOMBRE_COMPONENTE%, component:%NOMBRE_COMPONENTE%Router' | Set-Content src\router\index.js"

:: Modificar store/index.js
powershell -Command "'import %NOMBRE_COMPONENTE% from ''@/modules/%NOMBRE_COMPONENTE%'';', (Get-Content src\store\index.js) | Set-Content src\store\index.js"
powershell -Command "(Get-Content src\store\index.js) -replace 'modules: {', 'modules: { %NOMBRE_COMPONENTE%: %NOMBRE_COMPONENTE%.store,' | Set-Content src\store\index.js"

echo Componente '%NOMBRE_COMPONENTE%' creado exitosamente.