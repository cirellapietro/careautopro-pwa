-- Abilita estensione per generare UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Funzione per generare UUID come TEXT
CREATE OR REPLACE FUNCTION generate_uuid_text()
RETURNS TEXT AS $$
BEGIN
    RETURN uuid_generate_v4()::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Funzione per aggiornare il campo dataOra
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.dataOra = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Funzione per impostare UUID sui campi PK (versione corretta)
CREATE OR REPLACE FUNCTION set_pk_uuid()
RETURNS TRIGGER AS $$
DECLARE
    table_name TEXT := lower(TG_TABLE_NAME);
BEGIN
    -- Tabella utenti
    IF table_name = 'utenti' THEN
        IF NEW.utente_id IS NULL THEN
            NEW.utente_id = generate_uuid_text();
        END IF;
    -- Tabella veicoli
    ELSIF table_name = 'veicoli' THEN
        IF NEW.veicolo_id IS NULL THEN
            NEW.veicolo_id = generate_uuid_text();
        END IF;
    -- Tabella interventi
    ELSIF table_name = 'interventi' THEN
        IF NEW.intervento_id IS NULL THEN
            NEW.intervento_id = generate_uuid_text();
        END IF;
    -- Tabella messaggiavviso
    ELSIF table_name = 'messaggiavviso' THEN
        IF NEW.messaggio_id IS NULL THEN
            NEW.messaggio_id = generate_uuid_text();
        END IF;
    -- Tabella controlliperiodici
    ELSIF table_name = 'controlliperiodici' THEN
        IF NEW.controlloperiodico_id IS NULL THEN
            NEW.controlloperiodico_id = generate_uuid_text();
        END IF;
    -- Tabella interventistato
    ELSIF table_name = 'interventistato' THEN
        IF NEW.interventistato_id IS NULL THEN
            NEW.interventistato_id = generate_uuid_text();
        END IF;
    -- Tabella operazioni
    ELSIF table_name = 'operazioni' THEN
        IF NEW.operazione_id IS NULL THEN
            NEW.operazione_id = generate_uuid_text();
        END IF;
    -- Tabella coincidenzadi
    ELSIF table_name = 'coincidenzadi' THEN
        IF NEW.inconcidenzadi_id IS NULL THEN
            NEW.inconcidenzadi_id = generate_uuid_text();
        END IF;
    -- Tabella tipoveicoli
    ELSIF table_name = 'tipoveicoli' THEN
        IF NEW.tipoveicolo_id IS NULL THEN
            NEW.tipoveicolo_id = generate_uuid_text();
        END IF;
    -- Tabella tiponotificaavviso
    ELSIF table_name = 'tiponotificaavviso' THEN
        IF NEW.tiponotificaavviso_id IS NULL THEN
            NEW.tiponotificaavviso_id = generate_uuid_text();
        END IF;
    -- Tabella ruoli
    ELSIF table_name = 'ruoli' THEN
        IF NEW.ruolo_id IS NULL THEN
            NEW.ruolo_id = generate_uuid_text();
        END IF;
    -- Tabella utentiruoli
    ELSIF table_name = 'utentiruoli' THEN
        IF NEW.utente_ruolo_id IS NULL THEN
            NEW.utente_ruolo_id = generate_uuid_text();
        END IF;
    -- Tabella utentistato
    ELSIF table_name = 'utentistato' THEN
        IF NEW.utentistato_id IS NULL THEN
            NEW.utentistato_id = generate_uuid_text();
        END IF;
    -- Tabella utentiprofilo
    ELSIF table_name = 'utentiprofilo' THEN
        IF NEW.profiloutente_id IS NULL THEN
            NEW.profiloutente_id = generate_uuid_text();
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Creazione tabelle senza riferimenti esterni
CREATE TABLE IF NOT EXISTS config (
    foglioveicoli TEXT,
    fogliomessaggi TEXT,
    foglioconfig TEXT,
    foglioutenti TEXT,
    clientsecret TEXT,
    soggettoemail TEXT,
    templateemail TEXT,
    frequenzaesecuzione TEXT,
    loglevel TEXT,
    debug BOOLEAN,
    intervallo INTEGER,
    unit TEXT,
    valore TEXT,
    inviamessaggireali BOOLEAN,
    twilioaccountsid TEXT,
    twilioauthtoken TEXT,
    twiliophonenumber TEXT,
    googlechatwebhookurl TEXT,
    telegrambottoken TEXT,
    telegramchatid TEXT,
    interventistatoid TEXT,
    orainvio TEXT,
    batchsize INTEGER,
    dataora TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_config_timestamp
    BEFORE UPDATE ON config
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS ruoli (
    ruolo_id TEXT PRIMARY KEY,
    descrizione TEXT,
    dataora TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_ruoli_uuid
    BEFORE INSERT ON ruoli
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_ruoli_timestamp
    BEFORE UPDATE ON ruoli
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS utentistato (
    utentistato_id TEXT PRIMARY KEY,
    statoutente TEXT,
    dataora TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_utenti_stato_uuid
    BEFORE INSERT ON utentistato
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_utenti_stato_timestamp
    BEFORE UPDATE ON utentistato
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS utentiprofilo (
    profiloutente_id TEXT PRIMARY KEY,
    statoutente TEXT,
    dataora TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_utenti_profilo_uuid
    BEFORE INSERT ON utentiprofilo
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_utenti_profilo_timestamp
    BEFORE UPDATE ON utentiprofilo
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS tipoveicoli (
    tipoveicolo_id TEXT PRIMARY KEY,
    descrizione TEXT,
    kmanno NUMERIC
);

CREATE TRIGGER set_tipo_veicoli_uuid
    BEFORE INSERT ON tipoveicoli
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_tipo_veicoli_timestamp
    BEFORE UPDATE ON tipoveicoli
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS tiponotificaavviso (
    tiponotificaavviso_id TEXT PRIMARY KEY,
    descrizione TEXT
);

CREATE TRIGGER set_tipo_notifica_avviso_uuid
    BEFORE INSERT ON tiponotificaavviso
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_tipo_notifica_avviso_timestamp
    BEFORE UPDATE ON tiponotificaavviso
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS interventistato (
    interventistato_id TEXT PRIMARY KEY,
    descrizione TEXT,
    sostituzione BOOLEAN,
    rabbocco BOOLEAN,
    inversione BOOLEAN,
    ispezione BOOLEAN
);

CREATE TRIGGER set_interventi_stato_uuid
    BEFORE INSERT ON interventistato
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_interventi_stato_timestamp
    BEFORE UPDATE ON interventistato
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS operazioni (
    operazione_id TEXT PRIMARY KEY,
    descrizione TEXT,
    sostituzione BOOLEAN,
    rabbocco BOOLEAN,
    inversione BOOLEAN,
    ispezione BOOLEAN
);

CREATE TRIGGER set_operazioni_uuid
    BEFORE INSERT ON operazioni
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_operazioni_timestamp
    BEFORE UPDATE ON operazioni
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS coincidenzadi (
    inconcidenzadi_id TEXT PRIMARY KEY,
    descrizione TEXT
);

CREATE TRIGGER set_coincidenza_di_uuid
    BEFORE INSERT ON coincidenzadi
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_coincidenza_di_timestamp
    BEFORE UPDATE ON coincidenzadi
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Creazione tabelle con un livello di dipendenza
CREATE TABLE IF NOT EXISTS utenti (
    utente_id TEXT PRIMARY KEY,
    nominativo TEXT,
    pwd TEXT,
    email TEXT,
    phone TEXT,
    provider TEXT,
    tiponotificaavviso_id TEXT REFERENCES tiponotificaavviso(tiponotificaavviso_id),
    utentistato_id TEXT REFERENCES utentistato(utentistato_id),
    profiloutente_id TEXT REFERENCES utentiprofilo(profiloutente_id),
    stato_verifica TEXT DEFAULT 'in_attesa',
    dataora TIMESTAMPTZ DEFAULT NOW(),
    dataoradisabilita TIMESTAMPTZ
);

CREATE TRIGGER set_utenti_uuid
    BEFORE INSERT ON utenti
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_utenti_timestamp
    BEFORE UPDATE ON utenti
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS utentiruoli (
    utente_ruolo_id TEXT PRIMARY KEY,
    utente_id TEXT REFERENCES utenti(utente_id) ON DELETE CASCADE,
    ruolo_id TEXT REFERENCES ruoli(ruolo_id) ON DELETE CASCADE,
    dataora TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_utenti_ruoli_uuid
    BEFORE INSERT ON utentiruoli
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_utenti_ruoli_timestamp
    BEFORE UPDATE ON utentiruoli
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS veicoli (
    veicolo_id TEXT PRIMARY KEY,
    utente_id TEXT REFERENCES utenti(utente_id),
    tipoveicolo_id TEXT REFERENCES tipoveicoli(tipoveicolo_id),
    modello TEXT,
    dataora TIMESTAMPTZ DEFAULT NOW(),
    kmanno NUMERIC,
    kmannodataorainserimento TIMESTAMPTZ,
    kmeffettivi NUMERIC,
    kmeffettividataorainserimento TIMESTAMPTZ,
    kmpresunti NUMERIC,
    kmpresuntidataorainserimento TIMESTAMPTZ,
    kmdagps NUMERIC,
    kmdagpsdataorainserimento TIMESTAMPTZ,
    kmattuali NUMERIC,
    kmattualidataorainserimento TIMESTAMPTZ,
    kw NUMERIC,
    cilindrata NUMERIC,
    dataimmatricolazione DATE,
    datainserimento TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_veicoli_uuid
    BEFORE INSERT ON veicoli
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_veicoli_timestamp
    BEFORE UPDATE ON veicoli
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS controlliperiodici (
    controlloperiodico_id TEXT PRIMARY KEY,
    tipoveicolo_id TEXT REFERENCES tipoveicoli(tipoveicolo_id),
    descrizione TEXT,
    operazione_id TEXT REFERENCES operazioni(operazione_id),
    frequenzakm NUMERIC,
    avvisokmprima NUMERIC,
    frequenzamesi NUMERIC,
    avvisogiorniprima NUMERIC,
    dakm NUMERIC,
    akm NUMERIC,
    damesi NUMERIC,
    amesi NUMERIC,
    inconcidenzadi_id TEXT REFERENCES coincidenzadi(inconcidenzadi_id),
    dataora TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_controlli_periodici_uuid
    BEFORE INSERT ON controlliperiodici
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_controlli_periodici_timestamp
    BEFORE UPDATE ON controlliperiodici
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Creazione tabelle con due livelli di dipendenza
CREATE TABLE IF NOT EXISTS interventi (
    intervento_id TEXT PRIMARY KEY,
    veicolo_id TEXT REFERENCES veicoli(veicolo_id),
    controlloperiodico_id TEXT REFERENCES controlliperiodici(controlloperiodico_id),
    interventistato_id TEXT REFERENCES interventistato(interventistato_id),
    descrizioneaggiuntiva TEXT,
    kmintervento NUMERIC,
    mesi NUMERIC,
    dataoraintervento TIMESTAMPTZ,
    dataora TIMESTAMPTZ DEFAULT NOW(),
    batchid TEXT
);

CREATE TRIGGER set_interventi_uuid
    BEFORE INSERT ON interventi
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_interventi_timestamp
    BEFORE UPDATE ON interventi
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS messaggiavviso (
    messaggio_id TEXT PRIMARY KEY,
    veicolo_id TEXT REFERENCES veicoli(veicolo_id),
    utente_id TEXT REFERENCES utenti(utente_id),
    operazione_id TEXT REFERENCES operazioni(operazione_id),
    intervento_id TEXT REFERENCES interventi(intervento_id),
    tiponotifica TEXT,
    statoinvio TEXT,
    contenuto TEXT,
    dataora TIMESTAMPTZ DEFAULT NOW(),
    batchid TEXT
);

CREATE TRIGGER set_messaggi_avviso_uuid
    BEFORE INSERT ON messaggiavviso
    FOR EACH ROW
    EXECUTE FUNCTION set_pk_uuid();

CREATE TRIGGER update_messaggi_avviso_timestamp
    BEFORE UPDATE ON messaggiavviso
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TABLE IF NOT EXISTS logs (
    dataora TIMESTAMPTZ DEFAULT NOW(),
    descrizione TEXT,
    tiponotifica TEXT,
    statoinvio TEXT,
    messaggio TEXT,
    destinatario TEXT
);

-- Inserisci dati iniziali
INSERT INTO ruoli (ruolo_id, descrizione) VALUES
('fruitore', 'Utente fruitore dei servizi'),
('amministratore', 'Amministratore del sistema');

INSERT INTO tiponotificaavviso (tiponotificaavviso_id, descrizione) VALUES
('email', 'Email'),
('whatsapp', 'WhatsApp'),
('entrambi', 'Email e WhatsApp');

INSERT INTO utentistato (utentistato_id, statoutente) VALUES
('attivo', 'Attivo'),
('disabilitato', 'Disabilitato'),
('in_attesa', 'In Attesa');

INSERT INTO interventistato (interventistato_id, descrizione, sostituzione, rabbocco, inversione, ispezione) VALUES
('641d607e', 'SOSTITUZIONE', TRUE, FALSE, FALSE, FALSE),
('34fedca', 'RABOCCO', FALSE, TRUE, FALSE, FALSE),
('87281bf4', 'INVERSIONE', FALSE, FALSE, TRUE, FALSE),
('77a746c7', 'ISPEZIONE', FALSE, FALSE, FALSE, TRUE);

INSERT INTO operazioni (operazione_id, descrizione, sostituzione, rabbocco, inversione, ispezione) VALUES
('sostituzione', 'Sostituzione', TRUE, FALSE, FALSE, FALSE),
('rabbocco', 'Rabbocco', FALSE, TRUE, FALSE, FALSE),
('inversione', 'Inversione', FALSE, FALSE, TRUE, FALSE),
('ispezione', 'Ispezione', FALSE, FALSE, FALSE, TRUE);

INSERT INTO coincidenzadi (inconcidenzadi_id, descrizione) VALUES
('tagliando', 'Tagliando'),
('revisione', 'Revisione'),
('cambio_olio', 'Cambio Olio');

INSERT INTO tipoveicoli (tipoveicolo_id, descrizione, kmanno) VALUES
('auto', 'Automobile', 15000),
('moto', 'Motociclo', 8000),
('camion', 'Camion', 50000);

-- Crea utente amministratore di default
INSERT INTO utenti (utente_id, nominativo, email, pwd, stato_verifica) VALUES
('admin_default', 'Amministratore', 'admin@example.com', 'admin123', 'attivo');

INSERT INTO utentiruoli (utente_ruolo_id, utente_id, ruolo_id) VALUES
('admin_role_default', 'admin_default', 'amministratore');

-- Crea indici per migliorare le performance
CREATE INDEX idx_veicoli_utente_id ON veicoli(utente_id);
CREATE INDEX idx_veicoli_tipo_veicolo_id ON veicoli(tipoveicolo_id);
CREATE INDEX idx_interventi_veicolo_id ON interventi(veicolo_id);
CREATE INDEX idx_interventi_controllo_periodico_id ON interventi(controlloperiodico_id);
CREATE INDEX idx_controlli_periodici_tipo_veicolo_id ON controlliperiodici(tipoveicolo_id);
CREATE INDEX idx_messaggi_avviso_veicolo_id ON messaggiavviso(veicolo_id);
CREATE INDEX idx_messaggi_avviso_utente_id ON messaggiavviso(utente_id);
CREATE INDEX idx_logs_data_ora ON logs(dataora);
CREATE INDEX idx_utenti_ruoli_utente_id ON utentiruoli(utente_id);
CREATE INDEX idx_utenti_ruoli_ruolo_id ON utentiruoli(ruolo_id);
CREATE INDEX idx_messaggi_avviso_intervento_id ON messaggiavviso(intervento_id);
