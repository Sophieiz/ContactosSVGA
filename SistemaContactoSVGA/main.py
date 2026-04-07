from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import mysql.connector

app = FastAPI()

# 1. Montamos la carpeta 'static' para que cargue tu CSS y JS
app.mount("/static", StaticFiles(directory="static"), name="static")

# 2. Función para conectar a tu MySQL de XAMPP
# 2. Función para conectar a tu MySQL de XAMPP
def conectar_db():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',       # Se deja vacío porque en phpMyAdmin dice "No"
        database='contactossvga', # IMPORTANTE: Todo en minúsculas como en tu foto
        port=3307          # El puerto que vimos en tu panel de XAMPP
    )
# 3. Ruta principal: Carga tu index.html
@app.get("/")
async def inicio():
    return FileResponse('static/index.html')

# 4. LA API: Esta ruta envía los datos reales de MySQL a tu tabla
@app.get("/api/contactos")
async def obtener_contactos():
    try:
        conexion = conectar_db()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM contactosvga") # <-- Nombre de tu tabla
        datos = cursor.fetchall()
        cursor.close()
        conexion.close()
        return datos
    except Exception as e:
        return {"error": str(e)}