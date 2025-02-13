## Pechschwarz Next Template

Dieses Template ist ein Starter-Template, welches darauf ausgelegt ist, mit der WordPress REST API in einem Headless-Setup zu arbeiten. Dieses Template bietet eine solide Grundlage für die Entwicklung von Webanwendungen mit Next.js, wobei WordPress als Content-Management-System im Backend dient.

### Erste Schritte

Dieses Template ist ein **Template-Repository**, was bedeutet, dass du ein neues Projekt direkt daraus erstellen kannst, ohne das ursprüngliche Repository zu verändern. Du kannst das Template folgendermaßen nutzen:

1. **Neues Repository aus dem Template erstellen**:

    - Klicke im GitHub-Repository auf die Schaltfläche **"Use this template"**.
    - Gib deinem neuen Repository einen Namen und wähle die Sichtbarkeit (öffentlich/privat).
    - Klicke auf **"Create repository from template"**, um dein eigenes Projekt zu erstellen.

2. **Projekt lokal klonen und installieren**:

    - Klone das Repository:
        ```bash
        git clone <deine-repository-url>
        cd <projektordner>
        ```
    - Installiere die Abhängigkeiten:
        ```bash
        pnpm install
        ```

3. **Konfiguration der WordPress API**:

    - Bearbeite die `.env`-Datei und füge die URL deiner WordPress-Installation ein:
        ```env
        WORDPRESS_API_URL=https://deine-wordpress-seite.com/wp-json
        ```

4. **Entwicklung starten**:

    - Starte die Entwicklungsumgebung:
        ```bash
        pnpm run dev
        ```
    - Das Projekt ist jetzt unter [http://localhost:3000](http://localhost:3000) verfügbar.

5. **Deployment vorbereiten**:

    - Erstelle eine Produktions-Build:
        ```bash
        pnpm build
        ```
    - Starte den Produktionsserver lokal:
        ```bash
        npm start
        ```
    - Für Hosting-Lösungen wie Vercel oder Netlify wird die Build-Konfiguration automatisch erkannt.
