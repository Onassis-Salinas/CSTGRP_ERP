PGDMP                      |            postgres    16.3 (Debian 16.3-1.pgdg120+1)    16.3 (Debian 16.3-1.pgdg120+1) �    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            @           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            A           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            B           1262    5    postgres    DATABASE     s   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE postgres;
                postgres    false            C           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3650                        2615    24576    cim    SCHEMA        CREATE SCHEMA cim;
    DROP SCHEMA cim;
                postgres    false            �            1259    24577    areas    TABLE     �   CREATE TABLE cim.areas (
    id bigint NOT NULL,
    name character varying(20) NOT NULL,
    captured boolean DEFAULT false NOT NULL
);
    DROP TABLE cim.areas;
       cim         heap    postgres    false    6            �            1259    24581    areas_id_seq    SEQUENCE     r   CREATE SEQUENCE cim.areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
     DROP SEQUENCE cim.areas_id_seq;
       cim          postgres    false    6    216            D           0    0    areas_id_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE cim.areas_id_seq OWNED BY cim.areas.id;
          cim          postgres    false    217            �            1259    24582 
   assistance    TABLE     �  CREATE TABLE cim.assistance (
    id bigint NOT NULL,
    "employeeId" bigint NOT NULL,
    "incidenceId0" bigint DEFAULT 1 NOT NULL,
    "mondayDate" date NOT NULL,
    "areaId" bigint NOT NULL,
    "positionId" bigint,
    "incidenceId1" bigint DEFAULT 1 NOT NULL,
    "incidenceId2" bigint DEFAULT 1 NOT NULL,
    "incidenceId3" bigint DEFAULT 1 NOT NULL,
    "incidenceId4" bigint DEFAULT 1 NOT NULL
);
    DROP TABLE cim.assistance;
       cim         heap    postgres    false    6            �            1259    24590    assistance_id_seq    SEQUENCE     w   CREATE SEQUENCE cim.assistance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE cim.assistance_id_seq;
       cim          postgres    false    218    6            E           0    0    assistance_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE cim.assistance_id_seq OWNED BY cim.assistance.id;
          cim          postgres    false    219            �            1259    24591    clients    TABLE     ^   CREATE TABLE cim.clients (
    id bigint NOT NULL,
    name character varying(45) NOT NULL
);
    DROP TABLE cim.clients;
       cim         heap    postgres    false    6            �            1259    24594    clients_id_seq    SEQUENCE     t   CREATE SEQUENCE cim.clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE cim.clients_id_seq;
       cim          postgres    false    6    220            F           0    0    clients_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE cim.clients_id_seq OWNED BY cim.clients.id;
          cim          postgres    false    221            �            1259    24891 	   computers    TABLE     �   CREATE TABLE cim.computers (
    id integer NOT NULL,
    "employeeId" integer,
    anydesk character varying(255),
    active boolean DEFAULT true NOT NULL,
    "lastMaintance" date,
    password character varying(100)
);
    DROP TABLE cim.computers;
       cim         heap    postgres    false    6            �            1259    24890    computers_id_seq    SEQUENCE     �   CREATE SEQUENCE cim.computers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE cim.computers_id_seq;
       cim          postgres    false    6    253            G           0    0    computers_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE cim.computers_id_seq OWNED BY cim.computers.id;
          cim          postgres    false    252            �            1259    24595    destinys    TABLE     _   CREATE TABLE cim.destinys (
    id bigint NOT NULL,
    name character varying(45) NOT NULL
);
    DROP TABLE cim.destinys;
       cim         heap    postgres    false    6            �            1259    24598    destinys_id_seq    SEQUENCE     u   CREATE SEQUENCE cim.destinys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE cim.destinys_id_seq;
       cim          postgres    false    222    6            H           0    0    destinys_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE cim.destinys_id_seq OWNED BY cim.destinys.id;
          cim          postgres    false    223            �            1259    24904    devices    TABLE     �   CREATE TABLE cim.devices (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    ip character varying(20),
    "user" character varying(100),
    password character varying(100),
    wifipw character varying(100)
);
    DROP TABLE cim.devices;
       cim         heap    postgres    false    6            �            1259    24903    devices_id_seq    SEQUENCE     �   CREATE SEQUENCE cim.devices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE cim.devices_id_seq;
       cim          postgres    false    255    6            I           0    0    devices_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE cim.devices_id_seq OWNED BY cim.devices.id;
          cim          postgres    false    254            �            1259    24879    emails    TABLE     �   CREATE TABLE cim.emails (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    "employeeId" integer,
    password character varying(100)
);
    DROP TABLE cim.emails;
       cim         heap    postgres    false    6            �            1259    24878    emails_id_seq    SEQUENCE     �   CREATE SEQUENCE cim.emails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE cim.emails_id_seq;
       cim          postgres    false    251    6            J           0    0    emails_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE cim.emails_id_seq OWNED BY cim.emails.id;
          cim          postgres    false    250            �            1259    24599    employeeproductivity    TABLE     w  CREATE TABLE cim.employeeproductivity (
    id bigint NOT NULL,
    "0code0" character varying(50) DEFAULT NULL::character varying,
    "0goal0" bigint,
    "0produced0" bigint,
    "0code1" character varying(50) DEFAULT NULL::character varying,
    "0goal1" bigint,
    "0produced1" bigint,
    "0code2" character varying(50) DEFAULT NULL::character varying,
    "0goal2" bigint,
    "0produced2" bigint,
    "0comment" character varying(100) DEFAULT NULL::character varying,
    "1code0" character varying(50) DEFAULT NULL::character varying,
    "1goal0" bigint,
    "1produced0" bigint,
    "1code1" character varying(50) DEFAULT NULL::character varying,
    "1goal1" bigint,
    "1produced1" bigint,
    "1code2" character varying(50) DEFAULT NULL::character varying,
    "1goal2" bigint,
    "1produced2" bigint,
    "2code0" character varying(50) DEFAULT NULL::character varying,
    "2goal0" bigint,
    "2produced0" bigint,
    "2code1" character varying(50) DEFAULT NULL::character varying,
    "2goal1" bigint,
    "2produced1" bigint,
    "2code2" character varying(50) DEFAULT NULL::character varying,
    "2goal2" bigint,
    "2produced2" bigint,
    "3code0" character varying(50) DEFAULT NULL::character varying,
    "3goal0" bigint,
    "3produced0" bigint,
    "3code1" character varying(50) DEFAULT NULL::character varying,
    "3goal1" bigint,
    "3produced1" bigint,
    "3code2" character varying(50) DEFAULT NULL::character varying,
    "3goal2" bigint,
    "3produced2" bigint,
    "4code0" character varying(50) DEFAULT NULL::character varying,
    "4goal0" bigint,
    "4produced0" bigint,
    "4code1" character varying(50) DEFAULT NULL::character varying,
    "4goal1" bigint,
    "4produced1" bigint,
    "4code2" character varying(50) DEFAULT NULL::character varying,
    "4goal2" bigint,
    "4produced2" bigint,
    "assistanceId" bigint NOT NULL,
    "1comment" character varying(100) DEFAULT NULL::character varying,
    "2comment" character varying(100) DEFAULT NULL::character varying,
    "3comment" character varying(100) DEFAULT NULL::character varying,
    "4comment" character varying(100) DEFAULT NULL::character varying
);
 %   DROP TABLE cim.employeeproductivity;
       cim         heap    postgres    false    6            �            1259    24624    employeeproductivity_id_seq    SEQUENCE     �   CREATE SEQUENCE cim.employeeproductivity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE cim.employeeproductivity_id_seq;
       cim          postgres    false    224    6            K           0    0    employeeproductivity_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE cim.employeeproductivity_id_seq OWNED BY cim.employeeproductivity.id;
          cim          postgres    false    225            �            1259    24625 	   employees    TABLE     �  CREATE TABLE cim.employees (
    id bigint NOT NULL,
    "noEmpleado" bigint,
    nss character varying(20),
    curp character varying(18),
    rfc character varying(13),
    blood character varying(4),
    account character varying(13),
    "emmergencyContact" character varying(40),
    "positionId" bigint NOT NULL,
    "admissionDate" date,
    active boolean DEFAULT true,
    "emmergencyNumber" character varying(16),
    "areaId" bigint DEFAULT '22'::bigint NOT NULL,
    "quitDate" date,
    "bornLocation" character varying(50),
    genre character varying(1),
    sons bigint DEFAULT '0'::bigint,
    "clinicNo" character varying(3),
    email character varying(50),
    number character varying(20),
    direction character varying(100),
    bank character varying(20),
    "infonavitNo" character varying(20),
    "infonavitFee" double precision,
    "infonavitDiscount" double precision,
    "positionType" character varying(20),
    cim date,
    shift character varying(20),
    "nominaSalary" double precision,
    "immsSalary" double precision,
    name character varying(100) NOT NULL,
    "paternalLastName" character varying(20),
    "maternalLastName" character varying(20),
    nationality character varying(20),
    "civilStatus" character varying(20),
    "bornDate" date,
    studies character varying(30),
    "quitReason" character varying(50),
    "quitStatus" character varying(20),
    "quitNotes" character varying(70),
    vacations integer
);
    DROP TABLE cim.employees;
       cim         heap    postgres    false    6            �            1259    24633    employees_id_seq    SEQUENCE     v   CREATE SEQUENCE cim.employees_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE cim.employees_id_seq;
       cim          postgres    false    6    226            L           0    0    employees_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE cim.employees_id_seq OWNED BY cim.employees.id;
          cim          postgres    false    227            �            1259    24634    general    TABLE     �   CREATE TABLE cim.general (
    id bigint NOT NULL,
    name character varying(50) DEFAULT NULL::character varying,
    value bigint
);
    DROP TABLE cim.general;
       cim         heap    postgres    false    6            �            1259    24638    general_id_seq    SEQUENCE     t   CREATE SEQUENCE cim.general_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE cim.general_id_seq;
       cim          postgres    false    228    6            M           0    0    general_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE cim.general_id_seq OWNED BY cim.general.id;
          cim          postgres    false    229            �            1259    24639 
   incidences    TABLE     �   CREATE TABLE cim.incidences (
    id bigint NOT NULL,
    code character varying(3) NOT NULL,
    name character varying(20) NOT NULL
);
    DROP TABLE cim.incidences;
       cim         heap    postgres    false    6            �            1259    24642    incidences_id_seq    SEQUENCE     w   CREATE SEQUENCE cim.incidences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE cim.incidences_id_seq;
       cim          postgres    false    230    6            N           0    0    incidences_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE cim.incidences_id_seq OWNED BY cim.incidences.id;
          cim          postgres    false    231            �            1259    24643 
   materialie    TABLE       CREATE TABLE cim.materialie (
    id bigint NOT NULL,
    jobpo character varying(6) DEFAULT NULL::character varying,
    programation character varying(10) DEFAULT NULL::character varying,
    due date NOT NULL,
    import character varying(20) DEFAULT NULL::character varying
);
    DROP TABLE cim.materialie;
       cim         heap    postgres    false    6            �            1259    24649    materialmovements    TABLE       CREATE TABLE cim.materialmovements (
    id bigint NOT NULL,
    "materialId" bigint NOT NULL,
    "movementId" bigint NOT NULL,
    amount numeric(10,2) NOT NULL,
    "realAmount" numeric(10,2) NOT NULL,
    "activeDate" date,
    active boolean DEFAULT false NOT NULL
);
 "   DROP TABLE cim.materialmovements;
       cim         heap    postgres    false    6            �            1259    24653 	   materials    TABLE     n  CREATE TABLE cim.materials (
    id bigint NOT NULL,
    code character varying(45) NOT NULL,
    description character varying(500) NOT NULL,
    measurement character varying(45) NOT NULL,
    "clientId" bigint,
    amount numeric(10,2) DEFAULT 0 NOT NULL,
    "minAmount" numeric(10,2) DEFAULT 0 NOT NULL,
    "leftoverAmount" numeric(10,2) DEFAULT 0 NOT NULL
);
    DROP TABLE cim.materials;
       cim         heap    postgres    false    6            �            1259    24662    materials_id_seq    SEQUENCE     v   CREATE SEQUENCE cim.materials_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE cim.materials_id_seq;
       cim          postgres    false    234    6            O           0    0    materials_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE cim.materials_id_seq OWNED BY cim.materials.id;
          cim          postgres    false    235            �            1259    24663    movements_id_seq    SEQUENCE     v   CREATE SEQUENCE cim.movements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE cim.movements_id_seq;
       cim          postgres    false    232    6            P           0    0    movements_id_seq    SEQUENCE OWNED BY     @   ALTER SEQUENCE cim.movements_id_seq OWNED BY cim.materialie.id;
          cim          postgres    false    236            �            1259    24664    outputs    TABLE     e  CREATE TABLE cim.outputs (
    id bigint NOT NULL,
    partid bigint,
    materialid bigint NOT NULL,
    clientid bigint,
    productid bigint,
    destinyid bigint,
    rev bigint,
    amount double precision NOT NULL,
    date date NOT NULL,
    balance double precision NOT NULL,
    job character(6) DEFAULT NULL::bpchar,
    entry boolean NOT NULL
);
    DROP TABLE cim.outputs;
       cim         heap    postgres    false    6            �            1259    24668    outputs_id_seq    SEQUENCE     t   CREATE SEQUENCE cim.outputs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE cim.outputs_id_seq;
       cim          postgres    false    6    237            Q           0    0    outputs_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE cim.outputs_id_seq OWNED BY cim.outputs.id;
          cim          postgres    false    238            �            1259    24669    parts    TABLE     �   CREATE TABLE cim.parts (
    id bigint NOT NULL,
    code character varying(45) NOT NULL,
    description character varying(100) NOT NULL
);
    DROP TABLE cim.parts;
       cim         heap    postgres    false    6            �            1259    24672    parts_id_seq    SEQUENCE     r   CREATE SEQUENCE cim.parts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
     DROP SEQUENCE cim.parts_id_seq;
       cim          postgres    false    239    6            R           0    0    parts_id_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE cim.parts_id_seq OWNED BY cim.parts.id;
          cim          postgres    false    240            �            1259    24673 	   positions    TABLE     `   CREATE TABLE cim.positions (
    id bigint NOT NULL,
    name character varying(40) NOT NULL
);
    DROP TABLE cim.positions;
       cim         heap    postgres    false    6            �            1259    24676    positions_id_seq    SEQUENCE     v   CREATE SEQUENCE cim.positions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE cim.positions_id_seq;
       cim          postgres    false    6    241            S           0    0    positions_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE cim.positions_id_seq OWNED BY cim.positions.id;
          cim          postgres    false    242            �            1259    24677    products    TABLE     _   CREATE TABLE cim.products (
    id bigint NOT NULL,
    name character varying(45) NOT NULL
);
    DROP TABLE cim.products;
       cim         heap    postgres    false    6            �            1259    24680    products_id_seq    SEQUENCE     u   CREATE SEQUENCE cim.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE cim.products_id_seq;
       cim          postgres    false    243    6            T           0    0    products_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE cim.products_id_seq OWNED BY cim.products.id;
          cim          postgres    false    244            �            1259    24681    relations_id_seq    SEQUENCE     v   CREATE SEQUENCE cim.relations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE cim.relations_id_seq;
       cim          postgres    false    6    233            U           0    0    relations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE cim.relations_id_seq OWNED BY cim.materialmovements.id;
          cim          postgres    false    245            �            1259    24682    users    TABLE     X  CREATE TABLE cim.users (
    id bigint NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(255) NOT NULL,
    perm_assistance_areas character varying(300) DEFAULT NULL::character varying,
    perm_users smallint DEFAULT 0 NOT NULL,
    perm_assistance smallint DEFAULT 0 NOT NULL,
    perm_productivity smallint DEFAULT 0 NOT NULL,
    perm_employees smallint DEFAULT 0 NOT NULL,
    perm_inventory smallint DEFAULT 0 NOT NULL,
    perm_structure integer DEFAULT 0 NOT NULL,
    perm_materials smallint DEFAULT 0 NOT NULL,
    perm_it smallint DEFAULT 0 NOT NULL
);
    DROP TABLE cim.users;
       cim         heap    postgres    false    6            �            1259    24695    users_id_seq    SEQUENCE     r   CREATE SEQUENCE cim.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
     DROP SEQUENCE cim.users_id_seq;
       cim          postgres    false    6    246            V           0    0    users_id_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE cim.users_id_seq OWNED BY cim.users.id;
          cim          postgres    false    247            �            1259    24696    vacationreq    TABLE     �  CREATE TABLE cim.vacationreq (
    id bigint NOT NULL,
    days smallint NOT NULL,
    employeeid bigint NOT NULL,
    requestdate date NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL,
    approved boolean DEFAULT false NOT NULL,
    year integer NOT NULL,
    withsalary smallint NOT NULL,
    withoutsalary smallint DEFAULT '0'::smallint NOT NULL,
    workday date NOT NULL,
    worked smallint NOT NULL,
    enjoyed smallint NOT NULL
);
    DROP TABLE cim.vacationreq;
       cim         heap    postgres    false    6            �            1259    24701    vacationreq_id_seq    SEQUENCE     x   CREATE SEQUENCE cim.vacationreq_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE cim.vacationreq_id_seq;
       cim          postgres    false    248    6            W           0    0    vacationreq_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE cim.vacationreq_id_seq OWNED BY cim.vacationreq.id;
          cim          postgres    false    249            �           2604    24702    areas id    DEFAULT     ^   ALTER TABLE ONLY cim.areas ALTER COLUMN id SET DEFAULT nextval('cim.areas_id_seq'::regclass);
 4   ALTER TABLE cim.areas ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    217    216            �           2604    24703    assistance id    DEFAULT     h   ALTER TABLE ONLY cim.assistance ALTER COLUMN id SET DEFAULT nextval('cim.assistance_id_seq'::regclass);
 9   ALTER TABLE cim.assistance ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    219    218            �           2604    24704 
   clients id    DEFAULT     b   ALTER TABLE ONLY cim.clients ALTER COLUMN id SET DEFAULT nextval('cim.clients_id_seq'::regclass);
 6   ALTER TABLE cim.clients ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    221    220            &           2604    24894    computers id    DEFAULT     f   ALTER TABLE ONLY cim.computers ALTER COLUMN id SET DEFAULT nextval('cim.computers_id_seq'::regclass);
 8   ALTER TABLE cim.computers ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    253    252    253            �           2604    24705    destinys id    DEFAULT     d   ALTER TABLE ONLY cim.destinys ALTER COLUMN id SET DEFAULT nextval('cim.destinys_id_seq'::regclass);
 7   ALTER TABLE cim.destinys ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    223    222            (           2604    24907 
   devices id    DEFAULT     b   ALTER TABLE ONLY cim.devices ALTER COLUMN id SET DEFAULT nextval('cim.devices_id_seq'::regclass);
 6   ALTER TABLE cim.devices ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    255    254    255            %           2604    24882 	   emails id    DEFAULT     `   ALTER TABLE ONLY cim.emails ALTER COLUMN id SET DEFAULT nextval('cim.emails_id_seq'::regclass);
 5   ALTER TABLE cim.emails ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    251    250    251            �           2604    24706    employeeproductivity id    DEFAULT     |   ALTER TABLE ONLY cim.employeeproductivity ALTER COLUMN id SET DEFAULT nextval('cim.employeeproductivity_id_seq'::regclass);
 C   ALTER TABLE cim.employeeproductivity ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    225    224                       2604    24707    employees id    DEFAULT     f   ALTER TABLE ONLY cim.employees ALTER COLUMN id SET DEFAULT nextval('cim.employees_id_seq'::regclass);
 8   ALTER TABLE cim.employees ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    227    226                       2604    24708 
   general id    DEFAULT     b   ALTER TABLE ONLY cim.general ALTER COLUMN id SET DEFAULT nextval('cim.general_id_seq'::regclass);
 6   ALTER TABLE cim.general ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    229    228                       2604    24709    incidences id    DEFAULT     h   ALTER TABLE ONLY cim.incidences ALTER COLUMN id SET DEFAULT nextval('cim.incidences_id_seq'::regclass);
 9   ALTER TABLE cim.incidences ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    231    230            	           2604    24710    materialie id    DEFAULT     g   ALTER TABLE ONLY cim.materialie ALTER COLUMN id SET DEFAULT nextval('cim.movements_id_seq'::regclass);
 9   ALTER TABLE cim.materialie ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    236    232                       2604    24711    materialmovements id    DEFAULT     n   ALTER TABLE ONLY cim.materialmovements ALTER COLUMN id SET DEFAULT nextval('cim.relations_id_seq'::regclass);
 @   ALTER TABLE cim.materialmovements ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    245    233                       2604    24712    materials id    DEFAULT     f   ALTER TABLE ONLY cim.materials ALTER COLUMN id SET DEFAULT nextval('cim.materials_id_seq'::regclass);
 8   ALTER TABLE cim.materials ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    235    234                       2604    24713 
   outputs id    DEFAULT     b   ALTER TABLE ONLY cim.outputs ALTER COLUMN id SET DEFAULT nextval('cim.outputs_id_seq'::regclass);
 6   ALTER TABLE cim.outputs ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    238    237                       2604    24714    parts id    DEFAULT     ^   ALTER TABLE ONLY cim.parts ALTER COLUMN id SET DEFAULT nextval('cim.parts_id_seq'::regclass);
 4   ALTER TABLE cim.parts ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    240    239                       2604    24715    positions id    DEFAULT     f   ALTER TABLE ONLY cim.positions ALTER COLUMN id SET DEFAULT nextval('cim.positions_id_seq'::regclass);
 8   ALTER TABLE cim.positions ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    242    241                       2604    24716    products id    DEFAULT     d   ALTER TABLE ONLY cim.products ALTER COLUMN id SET DEFAULT nextval('cim.products_id_seq'::regclass);
 7   ALTER TABLE cim.products ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    244    243                       2604    24717    users id    DEFAULT     ^   ALTER TABLE ONLY cim.users ALTER COLUMN id SET DEFAULT nextval('cim.users_id_seq'::regclass);
 4   ALTER TABLE cim.users ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    247    246            "           2604    24718    vacationreq id    DEFAULT     j   ALTER TABLE ONLY cim.vacationreq ALTER COLUMN id SET DEFAULT nextval('cim.vacationreq_id_seq'::regclass);
 :   ALTER TABLE cim.vacationreq ALTER COLUMN id DROP DEFAULT;
       cim          postgres    false    249    248                      0    24577    areas 
   TABLE DATA           0   COPY cim.areas (id, name, captured) FROM stdin;
    cim          postgres    false    216   �                 0    24582 
   assistance 
   TABLE DATA           �   COPY cim.assistance (id, "employeeId", "incidenceId0", "mondayDate", "areaId", "positionId", "incidenceId1", "incidenceId2", "incidenceId3", "incidenceId4") FROM stdin;
    cim          postgres    false    218   �                 0    24591    clients 
   TABLE DATA           (   COPY cim.clients (id, name) FROM stdin;
    cim          postgres    false    220   =      :          0    24891 	   computers 
   TABLE DATA           ^   COPY cim.computers (id, "employeeId", anydesk, active, "lastMaintance", password) FROM stdin;
    cim          postgres    false    253   �                0    24595    destinys 
   TABLE DATA           )   COPY cim.destinys (id, name) FROM stdin;
    cim          postgres    false    222   �      <          0    24904    devices 
   TABLE DATA           F   COPY cim.devices (id, name, ip, "user", password, wifipw) FROM stdin;
    cim          postgres    false    255   �      8          0    24879    emails 
   TABLE DATA           @   COPY cim.emails (id, email, "employeeId", password) FROM stdin;
    cim          postgres    false    251   S                0    24599    employeeproductivity 
   TABLE DATA           y  COPY cim.employeeproductivity (id, "0code0", "0goal0", "0produced0", "0code1", "0goal1", "0produced1", "0code2", "0goal2", "0produced2", "0comment", "1code0", "1goal0", "1produced0", "1code1", "1goal1", "1produced1", "1code2", "1goal2", "1produced2", "2code0", "2goal0", "2produced0", "2code1", "2goal1", "2produced1", "2code2", "2goal2", "2produced2", "3code0", "3goal0", "3produced0", "3code1", "3goal1", "3produced1", "3code2", "3goal2", "3produced2", "4code0", "4goal0", "4produced0", "4code1", "4goal1", "4produced1", "4code2", "4goal2", "4produced2", "assistanceId", "1comment", "2comment", "3comment", "4comment") FROM stdin;
    cim          postgres    false    224   p                0    24625 	   employees 
   TABLE DATA             COPY cim.employees (id, "noEmpleado", nss, curp, rfc, blood, account, "emmergencyContact", "positionId", "admissionDate", active, "emmergencyNumber", "areaId", "quitDate", "bornLocation", genre, sons, "clinicNo", email, number, direction, bank, "infonavitNo", "infonavitFee", "infonavitDiscount", "positionType", cim, shift, "nominaSalary", "immsSalary", name, "paternalLastName", "maternalLastName", nationality, "civilStatus", "bornDate", studies, "quitReason", "quitStatus", "quitNotes", vacations) FROM stdin;
    cim          postgres    false    226   �      !          0    24634    general 
   TABLE DATA           /   COPY cim.general (id, name, value) FROM stdin;
    cim          postgres    false    228   �      #          0    24639 
   incidences 
   TABLE DATA           1   COPY cim.incidences (id, code, name) FROM stdin;
    cim          postgres    false    230          %          0    24643 
   materialie 
   TABLE DATA           G   COPY cim.materialie (id, jobpo, programation, due, import) FROM stdin;
    cim          postgres    false    232   �       &          0    24649    materialmovements 
   TABLE DATA           t   COPY cim.materialmovements (id, "materialId", "movementId", amount, "realAmount", "activeDate", active) FROM stdin;
    cim          postgres    false    233   �&      '          0    24653 	   materials 
   TABLE DATA           w   COPY cim.materials (id, code, description, measurement, "clientId", amount, "minAmount", "leftoverAmount") FROM stdin;
    cim          postgres    false    234   ݮ      *          0    24664    outputs 
   TABLE DATA           ~   COPY cim.outputs (id, partid, materialid, clientid, productid, destinyid, rev, amount, date, balance, job, entry) FROM stdin;
    cim          postgres    false    237   S�      ,          0    24669    parts 
   TABLE DATA           3   COPY cim.parts (id, code, description) FROM stdin;
    cim          postgres    false    239   p�      .          0    24673 	   positions 
   TABLE DATA           *   COPY cim.positions (id, name) FROM stdin;
    cim          postgres    false    241   ��      0          0    24677    products 
   TABLE DATA           )   COPY cim.products (id, name) FROM stdin;
    cim          postgres    false    243   ��      3          0    24682    users 
   TABLE DATA           �   COPY cim.users (id, username, password, perm_assistance_areas, perm_users, perm_assistance, perm_productivity, perm_employees, perm_inventory, perm_structure, perm_materials, perm_it) FROM stdin;
    cim          postgres    false    246   ��      5          0    24696    vacationreq 
   TABLE DATA           �   COPY cim.vacationreq (id, days, employeeid, requestdate, startdate, enddate, approved, year, withsalary, withoutsalary, workday, worked, enjoyed) FROM stdin;
    cim          postgres    false    248   T�      X           0    0    areas_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('cim.areas_id_seq', 26, true);
          cim          postgres    false    217            Y           0    0    assistance_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('cim.assistance_id_seq', 3289, true);
          cim          postgres    false    219            Z           0    0    clients_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('cim.clients_id_seq', 11, true);
          cim          postgres    false    221            [           0    0    computers_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('cim.computers_id_seq', 1, false);
          cim          postgres    false    252            \           0    0    destinys_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('cim.destinys_id_seq', 4, true);
          cim          postgres    false    223            ]           0    0    devices_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('cim.devices_id_seq', 5, true);
          cim          postgres    false    254            ^           0    0    emails_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('cim.emails_id_seq', 1, false);
          cim          postgres    false    250            _           0    0    employeeproductivity_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('cim.employeeproductivity_id_seq', 198, true);
          cim          postgres    false    225            `           0    0    employees_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('cim.employees_id_seq', 4412, true);
          cim          postgres    false    227            a           0    0    general_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('cim.general_id_seq', 1, true);
          cim          postgres    false    229            b           0    0    incidences_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('cim.incidences_id_seq', 10, true);
          cim          postgres    false    231            c           0    0    materials_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('cim.materials_id_seq', 4036, true);
          cim          postgres    false    235            d           0    0    movements_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('cim.movements_id_seq', 973, true);
          cim          postgres    false    236            e           0    0    outputs_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('cim.outputs_id_seq', 1, true);
          cim          postgres    false    238            f           0    0    parts_id_seq    SEQUENCE SET     7   SELECT pg_catalog.setval('cim.parts_id_seq', 3, true);
          cim          postgres    false    240            g           0    0    positions_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('cim.positions_id_seq', 59, true);
          cim          postgres    false    242            h           0    0    products_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('cim.products_id_seq', 23, true);
          cim          postgres    false    244            i           0    0    relations_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('cim.relations_id_seq', 1217131, true);
          cim          postgres    false    245            j           0    0    users_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('cim.users_id_seq', 43, true);
          cim          postgres    false    247            k           0    0    vacationreq_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('cim.vacationreq_id_seq', 1, true);
          cim          postgres    false    249            o           2606    24897    computers computers_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY cim.computers
    ADD CONSTRAINT computers_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY cim.computers DROP CONSTRAINT computers_pkey;
       cim            postgres    false    253            q           2606    24909    devices devices_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY cim.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY cim.devices DROP CONSTRAINT devices_pkey;
       cim            postgres    false    255            m           2606    24884    emails emails_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY cim.emails
    ADD CONSTRAINT emails_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY cim.emails DROP CONSTRAINT emails_pkey;
       cim            postgres    false    251            +           2606    24720    areas idx_24856_primary 
   CONSTRAINT     R   ALTER TABLE ONLY cim.areas
    ADD CONSTRAINT idx_24856_primary PRIMARY KEY (id);
 >   ALTER TABLE ONLY cim.areas DROP CONSTRAINT idx_24856_primary;
       cim            postgres    false    216            4           2606    24722    assistance idx_24861_primary 
   CONSTRAINT     W   ALTER TABLE ONLY cim.assistance
    ADD CONSTRAINT idx_24861_primary PRIMARY KEY (id);
 C   ALTER TABLE ONLY cim.assistance DROP CONSTRAINT idx_24861_primary;
       cim            postgres    false    218            8           2606    24724    clients idx_24866_primary 
   CONSTRAINT     T   ALTER TABLE ONLY cim.clients
    ADD CONSTRAINT idx_24866_primary PRIMARY KEY (id);
 @   ALTER TABLE ONLY cim.clients DROP CONSTRAINT idx_24866_primary;
       cim            postgres    false    220            ;           2606    24726    destinys idx_24871_primary 
   CONSTRAINT     U   ALTER TABLE ONLY cim.destinys
    ADD CONSTRAINT idx_24871_primary PRIMARY KEY (id);
 A   ALTER TABLE ONLY cim.destinys DROP CONSTRAINT idx_24871_primary;
       cim            postgres    false    222            >           2606    24728 &   employeeproductivity idx_24876_primary 
   CONSTRAINT     a   ALTER TABLE ONLY cim.employeeproductivity
    ADD CONSTRAINT idx_24876_primary PRIMARY KEY (id);
 M   ALTER TABLE ONLY cim.employeeproductivity DROP CONSTRAINT idx_24876_primary;
       cim            postgres    false    224            B           2606    24730    employees idx_24903_primary 
   CONSTRAINT     V   ALTER TABLE ONLY cim.employees
    ADD CONSTRAINT idx_24903_primary PRIMARY KEY (id);
 B   ALTER TABLE ONLY cim.employees DROP CONSTRAINT idx_24903_primary;
       cim            postgres    false    226            D           2606    24732    general idx_24938_primary 
   CONSTRAINT     T   ALTER TABLE ONLY cim.general
    ADD CONSTRAINT idx_24938_primary PRIMARY KEY (id);
 @   ALTER TABLE ONLY cim.general DROP CONSTRAINT idx_24938_primary;
       cim            postgres    false    228            F           2606    24734    incidences idx_24944_primary 
   CONSTRAINT     W   ALTER TABLE ONLY cim.incidences
    ADD CONSTRAINT idx_24944_primary PRIMARY KEY (id);
 C   ALTER TABLE ONLY cim.incidences DROP CONSTRAINT idx_24944_primary;
       cim            postgres    false    230            S           2606    24736    materials idx_24955_primary 
   CONSTRAINT     V   ALTER TABLE ONLY cim.materials
    ADD CONSTRAINT idx_24955_primary PRIMARY KEY (id);
 B   ALTER TABLE ONLY cim.materials DROP CONSTRAINT idx_24955_primary;
       cim            postgres    false    234            I           2606    24738    materialie idx_24963_primary 
   CONSTRAINT     W   ALTER TABLE ONLY cim.materialie
    ADD CONSTRAINT idx_24963_primary PRIMARY KEY (id);
 C   ALTER TABLE ONLY cim.materialie DROP CONSTRAINT idx_24963_primary;
       cim            postgres    false    232            Z           2606    24740    outputs idx_24971_primary 
   CONSTRAINT     T   ALTER TABLE ONLY cim.outputs
    ADD CONSTRAINT idx_24971_primary PRIMARY KEY (id);
 @   ALTER TABLE ONLY cim.outputs DROP CONSTRAINT idx_24971_primary;
       cim            postgres    false    237            ]           2606    24742    parts idx_24977_primary 
   CONSTRAINT     R   ALTER TABLE ONLY cim.parts
    ADD CONSTRAINT idx_24977_primary PRIMARY KEY (id);
 >   ALTER TABLE ONLY cim.parts DROP CONSTRAINT idx_24977_primary;
       cim            postgres    false    239            _           2606    24744    positions idx_24982_primary 
   CONSTRAINT     V   ALTER TABLE ONLY cim.positions
    ADD CONSTRAINT idx_24982_primary PRIMARY KEY (id);
 B   ALTER TABLE ONLY cim.positions DROP CONSTRAINT idx_24982_primary;
       cim            postgres    false    241            c           2606    24746    products idx_24987_primary 
   CONSTRAINT     U   ALTER TABLE ONLY cim.products
    ADD CONSTRAINT idx_24987_primary PRIMARY KEY (id);
 A   ALTER TABLE ONLY cim.products DROP CONSTRAINT idx_24987_primary;
       cim            postgres    false    243            L           2606    24748 #   materialmovements idx_24992_primary 
   CONSTRAINT     ^   ALTER TABLE ONLY cim.materialmovements
    ADD CONSTRAINT idx_24992_primary PRIMARY KEY (id);
 J   ALTER TABLE ONLY cim.materialmovements DROP CONSTRAINT idx_24992_primary;
       cim            postgres    false    233            f           2606    24750    users idx_24998_primary 
   CONSTRAINT     R   ALTER TABLE ONLY cim.users
    ADD CONSTRAINT idx_24998_primary PRIMARY KEY (id);
 >   ALTER TABLE ONLY cim.users DROP CONSTRAINT idx_24998_primary;
       cim            postgres    false    246            j           2606    24752    vacationreq idx_25010_primary 
   CONSTRAINT     X   ALTER TABLE ONLY cim.vacationreq
    ADD CONSTRAINT idx_25010_primary PRIMARY KEY (id);
 D   ALTER TABLE ONLY cim.vacationreq DROP CONSTRAINT idx_25010_primary;
       cim            postgres    false    248            h           2606    24754    users unique_username 
   CONSTRAINT     Q   ALTER TABLE ONLY cim.users
    ADD CONSTRAINT unique_username UNIQUE (username);
 <   ALTER TABLE ONLY cim.users DROP CONSTRAINT unique_username;
       cim            postgres    false    246            )           1259    24755    areas_index_2    INDEX     C   CREATE UNIQUE INDEX areas_index_2 ON cim.areas USING btree (name);
    DROP INDEX cim.areas_index_2;
       cim            postgres    false    216            ,           1259    24756    idx_24861_assistance_relation_2    INDEX     [   CREATE INDEX idx_24861_assistance_relation_2 ON cim.assistance USING btree ("employeeId");
 0   DROP INDEX cim.idx_24861_assistance_relation_2;
       cim            postgres    false    218            -           1259    24757    idx_24861_assistance_relation_3    INDEX     W   CREATE INDEX idx_24861_assistance_relation_3 ON cim.assistance USING btree ("areaId");
 0   DROP INDEX cim.idx_24861_assistance_relation_3;
       cim            postgres    false    218            .           1259    24758    idx_24861_assistance_relation_4    INDEX     [   CREATE INDEX idx_24861_assistance_relation_4 ON cim.assistance USING btree ("positionId");
 0   DROP INDEX cim.idx_24861_assistance_relation_4;
       cim            postgres    false    218            /           1259    24759    idx_24861_assistance_relation_5    INDEX     ]   CREATE INDEX idx_24861_assistance_relation_5 ON cim.assistance USING btree ("incidenceId0");
 0   DROP INDEX cim.idx_24861_assistance_relation_5;
       cim            postgres    false    218            0           1259    24760    idx_24861_assistance_relation_6    INDEX     ]   CREATE INDEX idx_24861_assistance_relation_6 ON cim.assistance USING btree ("incidenceId1");
 0   DROP INDEX cim.idx_24861_assistance_relation_6;
       cim            postgres    false    218            1           1259    24761    idx_24861_assistance_relation_7    INDEX     ]   CREATE INDEX idx_24861_assistance_relation_7 ON cim.assistance USING btree ("incidenceId2");
 0   DROP INDEX cim.idx_24861_assistance_relation_7;
       cim            postgres    false    218            2           1259    24762    idx_24861_assistance_relation_8    INDEX     ]   CREATE INDEX idx_24861_assistance_relation_8 ON cim.assistance USING btree ("incidenceId3");
 0   DROP INDEX cim.idx_24861_assistance_relation_8;
       cim            postgres    false    218            5           1259    24763    idx_24866_id_unique    INDEX     I   CREATE UNIQUE INDEX idx_24866_id_unique ON cim.clients USING btree (id);
 $   DROP INDEX cim.idx_24866_id_unique;
       cim            postgres    false    220            6           1259    24764    idx_24866_name_unique    INDEX     M   CREATE UNIQUE INDEX idx_24866_name_unique ON cim.clients USING btree (name);
 &   DROP INDEX cim.idx_24866_name_unique;
       cim            postgres    false    220            9           1259    24765    idx_24871_id_unique    INDEX     J   CREATE UNIQUE INDEX idx_24871_id_unique ON cim.destinys USING btree (id);
 $   DROP INDEX cim.idx_24871_id_unique;
       cim            postgres    false    222            <           1259    24766 )   idx_24876_employeeproductivity_relation_1    INDEX     q   CREATE INDEX idx_24876_employeeproductivity_relation_1 ON cim.employeeproductivity USING btree ("assistanceId");
 :   DROP INDEX cim.idx_24876_employeeproductivity_relation_1;
       cim            postgres    false    224            ?           1259    24767    idx_24903_employees_relation_1    INDEX     U   CREATE INDEX idx_24903_employees_relation_1 ON cim.employees USING btree ("areaId");
 /   DROP INDEX cim.idx_24903_employees_relation_1;
       cim            postgres    false    226            @           1259    24768    idx_24903_noempleado    INDEX     V   CREATE UNIQUE INDEX idx_24903_noempleado ON cim.employees USING btree ("noEmpleado");
 %   DROP INDEX cim.idx_24903_noempleado;
       cim            postgres    false    226            O           1259    24769    idx_24955_code    INDEX     H   CREATE UNIQUE INDEX idx_24955_code ON cim.materials USING btree (code);
    DROP INDEX cim.idx_24955_code;
       cim            postgres    false    234            P           1259    24770    idx_24955_id_unique    INDEX     K   CREATE UNIQUE INDEX idx_24955_id_unique ON cim.materials USING btree (id);
 $   DROP INDEX cim.idx_24955_id_unique;
       cim            postgres    false    234            Q           1259    24771    idx_24955_materials_relation_1    INDEX     W   CREATE INDEX idx_24955_materials_relation_1 ON cim.materials USING btree ("clientId");
 /   DROP INDEX cim.idx_24955_materials_relation_1;
       cim            postgres    false    234            G           1259    24772    idx_24963_job    INDEX     I   CREATE UNIQUE INDEX idx_24963_job ON cim.materialie USING btree (jobpo);
    DROP INDEX cim.idx_24963_job;
       cim            postgres    false    232            T           1259    24773    idx_24971_clientid_idx    INDEX     K   CREATE INDEX idx_24971_clientid_idx ON cim.outputs USING btree (clientid);
 '   DROP INDEX cim.idx_24971_clientid_idx;
       cim            postgres    false    237            U           1259    24774    idx_24971_destinyid_idx    INDEX     M   CREATE INDEX idx_24971_destinyid_idx ON cim.outputs USING btree (destinyid);
 (   DROP INDEX cim.idx_24971_destinyid_idx;
       cim            postgres    false    237            V           1259    24775    idx_24971_id_unique    INDEX     I   CREATE UNIQUE INDEX idx_24971_id_unique ON cim.outputs USING btree (id);
 $   DROP INDEX cim.idx_24971_id_unique;
       cim            postgres    false    237            W           1259    24776    idx_24971_materialid_idx    INDEX     O   CREATE INDEX idx_24971_materialid_idx ON cim.outputs USING btree (materialid);
 )   DROP INDEX cim.idx_24971_materialid_idx;
       cim            postgres    false    237            X           1259    24777    idx_24971_partid_idx    INDEX     G   CREATE INDEX idx_24971_partid_idx ON cim.outputs USING btree (partid);
 %   DROP INDEX cim.idx_24971_partid_idx;
       cim            postgres    false    237            [           1259    24778    idx_24971_productid_idx    INDEX     M   CREATE INDEX idx_24971_productid_idx ON cim.outputs USING btree (productid);
 (   DROP INDEX cim.idx_24971_productid_idx;
       cim            postgres    false    237            a           1259    24779    idx_24987_name_unique    INDEX     N   CREATE UNIQUE INDEX idx_24987_name_unique ON cim.products USING btree (name);
 &   DROP INDEX cim.idx_24987_name_unique;
       cim            postgres    false    243            d           1259    24780    idx_24987_product_unique    INDEX     O   CREATE UNIQUE INDEX idx_24987_product_unique ON cim.products USING btree (id);
 )   DROP INDEX cim.idx_24987_product_unique;
       cim            postgres    false    243            M           1259    24781    idx_24992_relations_relation_1    INDEX     a   CREATE INDEX idx_24992_relations_relation_1 ON cim.materialmovements USING btree ("materialId");
 /   DROP INDEX cim.idx_24992_relations_relation_1;
       cim            postgres    false    233            N           1259    24782    idx_24992_relations_relation_2    INDEX     a   CREATE INDEX idx_24992_relations_relation_2 ON cim.materialmovements USING btree ("movementId");
 /   DROP INDEX cim.idx_24992_relations_relation_2;
       cim            postgres    false    233            k           1259    24783     idx_25010_vacationreq_relation_1    INDEX     [   CREATE INDEX idx_25010_vacationreq_relation_1 ON cim.vacationreq USING btree (employeeid);
 1   DROP INDEX cim.idx_25010_vacationreq_relation_1;
       cim            postgres    false    248            J           1259    24784    materialie_index_import    INDEX     T   CREATE UNIQUE INDEX materialie_index_import ON cim.materialie USING btree (import);
 (   DROP INDEX cim.materialie_index_import;
       cim            postgres    false    232            `           1259    24785    positions_index_2    INDEX     K   CREATE UNIQUE INDEX positions_index_2 ON cim.positions USING btree (name);
 "   DROP INDEX cim.positions_index_2;
       cim            postgres    false    241            r           2606    24786     assistance assistance_relation_2    FK CONSTRAINT     �   ALTER TABLE ONLY cim.assistance
    ADD CONSTRAINT assistance_relation_2 FOREIGN KEY ("employeeId") REFERENCES cim.employees(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 G   ALTER TABLE ONLY cim.assistance DROP CONSTRAINT assistance_relation_2;
       cim          postgres    false    3394    226    218            s           2606    24791     assistance assistance_relation_3    FK CONSTRAINT     �   ALTER TABLE ONLY cim.assistance
    ADD CONSTRAINT assistance_relation_3 FOREIGN KEY ("areaId") REFERENCES cim.areas(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 G   ALTER TABLE ONLY cim.assistance DROP CONSTRAINT assistance_relation_3;
       cim          postgres    false    218    3371    216            t           2606    24796     assistance assistance_relation_4    FK CONSTRAINT     �   ALTER TABLE ONLY cim.assistance
    ADD CONSTRAINT assistance_relation_4 FOREIGN KEY ("positionId") REFERENCES cim.positions(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 G   ALTER TABLE ONLY cim.assistance DROP CONSTRAINT assistance_relation_4;
       cim          postgres    false    3423    218    241            u           2606    24801     assistance assistance_relation_5    FK CONSTRAINT     �   ALTER TABLE ONLY cim.assistance
    ADD CONSTRAINT assistance_relation_5 FOREIGN KEY ("incidenceId0") REFERENCES cim.incidences(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 G   ALTER TABLE ONLY cim.assistance DROP CONSTRAINT assistance_relation_5;
       cim          postgres    false    218    3398    230            v           2606    24806     assistance assistance_relation_6    FK CONSTRAINT     �   ALTER TABLE ONLY cim.assistance
    ADD CONSTRAINT assistance_relation_6 FOREIGN KEY ("incidenceId1") REFERENCES cim.incidences(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 G   ALTER TABLE ONLY cim.assistance DROP CONSTRAINT assistance_relation_6;
       cim          postgres    false    218    3398    230            w           2606    24811     assistance assistance_relation_7    FK CONSTRAINT     �   ALTER TABLE ONLY cim.assistance
    ADD CONSTRAINT assistance_relation_7 FOREIGN KEY ("incidenceId2") REFERENCES cim.incidences(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 G   ALTER TABLE ONLY cim.assistance DROP CONSTRAINT assistance_relation_7;
       cim          postgres    false    230    218    3398            x           2606    24816     assistance assistance_relation_8    FK CONSTRAINT     �   ALTER TABLE ONLY cim.assistance
    ADD CONSTRAINT assistance_relation_8 FOREIGN KEY ("incidenceId3") REFERENCES cim.incidences(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 G   ALTER TABLE ONLY cim.assistance DROP CONSTRAINT assistance_relation_8;
       cim          postgres    false    230    218    3398            �           2606    24898    computers computers_relation_1    FK CONSTRAINT     �   ALTER TABLE ONLY cim.computers
    ADD CONSTRAINT computers_relation_1 FOREIGN KEY ("employeeId") REFERENCES cim.employees(id);
 E   ALTER TABLE ONLY cim.computers DROP CONSTRAINT computers_relation_1;
       cim          postgres    false    3394    226    253            �           2606    24885    emails emails_relation_1    FK CONSTRAINT     z   ALTER TABLE ONLY cim.emails
    ADD CONSTRAINT emails_relation_1 FOREIGN KEY ("employeeId") REFERENCES cim.employees(id);
 ?   ALTER TABLE ONLY cim.emails DROP CONSTRAINT emails_relation_1;
       cim          postgres    false    226    3394    251            y           2606    24821 4   employeeproductivity employeeproductivity_relation_1    FK CONSTRAINT     �   ALTER TABLE ONLY cim.employeeproductivity
    ADD CONSTRAINT employeeproductivity_relation_1 FOREIGN KEY ("assistanceId") REFERENCES cim.assistance(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 [   ALTER TABLE ONLY cim.employeeproductivity DROP CONSTRAINT employeeproductivity_relation_1;
       cim          postgres    false    218    3380    224            z           2606    24826    employees employees_relation_1    FK CONSTRAINT     �   ALTER TABLE ONLY cim.employees
    ADD CONSTRAINT employees_relation_1 FOREIGN KEY ("areaId") REFERENCES cim.areas(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 E   ALTER TABLE ONLY cim.employees DROP CONSTRAINT employees_relation_1;
       cim          postgres    false    216    3371    226            }           2606    24831    materials materials_relation_1    FK CONSTRAINT     �   ALTER TABLE ONLY cim.materials
    ADD CONSTRAINT materials_relation_1 FOREIGN KEY ("clientId") REFERENCES cim.clients(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 E   ALTER TABLE ONLY cim.materials DROP CONSTRAINT materials_relation_1;
       cim          postgres    false    220    3384    234            ~           2606    24836    outputs outputs_clientid    FK CONSTRAINT     �   ALTER TABLE ONLY cim.outputs
    ADD CONSTRAINT outputs_clientid FOREIGN KEY (clientid) REFERENCES cim.clients(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 ?   ALTER TABLE ONLY cim.outputs DROP CONSTRAINT outputs_clientid;
       cim          postgres    false    3384    220    237                       2606    24841    outputs outputs_destinyid    FK CONSTRAINT     �   ALTER TABLE ONLY cim.outputs
    ADD CONSTRAINT outputs_destinyid FOREIGN KEY (destinyid) REFERENCES cim.destinys(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 @   ALTER TABLE ONLY cim.outputs DROP CONSTRAINT outputs_destinyid;
       cim          postgres    false    237    3387    222            �           2606    24846    outputs outputs_materialid    FK CONSTRAINT     �   ALTER TABLE ONLY cim.outputs
    ADD CONSTRAINT outputs_materialid FOREIGN KEY (materialid) REFERENCES cim.materials(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 A   ALTER TABLE ONLY cim.outputs DROP CONSTRAINT outputs_materialid;
       cim          postgres    false    3411    234    237            �           2606    24851    outputs outputs_partid    FK CONSTRAINT     �   ALTER TABLE ONLY cim.outputs
    ADD CONSTRAINT outputs_partid FOREIGN KEY (partid) REFERENCES cim.parts(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 =   ALTER TABLE ONLY cim.outputs DROP CONSTRAINT outputs_partid;
       cim          postgres    false    237    239    3421            �           2606    24856    outputs outputs_productid    FK CONSTRAINT     �   ALTER TABLE ONLY cim.outputs
    ADD CONSTRAINT outputs_productid FOREIGN KEY (productid) REFERENCES cim.products(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 @   ALTER TABLE ONLY cim.outputs DROP CONSTRAINT outputs_productid;
       cim          postgres    false    237    3427    243            {           2606    24861 &   materialmovements relations_relation_1    FK CONSTRAINT     �   ALTER TABLE ONLY cim.materialmovements
    ADD CONSTRAINT relations_relation_1 FOREIGN KEY ("materialId") REFERENCES cim.materials(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 M   ALTER TABLE ONLY cim.materialmovements DROP CONSTRAINT relations_relation_1;
       cim          postgres    false    233    234    3411            |           2606    24866 &   materialmovements relations_relation_2    FK CONSTRAINT     �   ALTER TABLE ONLY cim.materialmovements
    ADD CONSTRAINT relations_relation_2 FOREIGN KEY ("movementId") REFERENCES cim.materialie(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 M   ALTER TABLE ONLY cim.materialmovements DROP CONSTRAINT relations_relation_2;
       cim          postgres    false    233    3401    232            �           2606    24871 "   vacationreq vacationreq_relation_1    FK CONSTRAINT     �   ALTER TABLE ONLY cim.vacationreq
    ADD CONSTRAINT vacationreq_relation_1 FOREIGN KEY (employeeid) REFERENCES cim.employees(id);
 I   ALTER TABLE ONLY cim.vacationreq DROP CONSTRAINT vacationreq_relation_1;
       cim          postgres    false    248    226    3394               �   x�=O�j�@<k�b %v��9�nB}=�^T��.ث +��_)�vf���>P2Op��)���N$�<gt��[���E��1SQ6�^B[zS,�v������S�JSǅ��n�+�М�ؼ������(�3d��P��F��&5��w�t��5�V��u�h����#+@!���E��}����;*NVsʦ}��C�g_z�O*�{�_!��aZs            x��][��,�{������^f���$g��
�Oݥ6>6	�$Ř�J��/���ʿP����_�ϟ�R���Y<(^�1�2���P[�r ���X �;�4/Pߖ�*�T��d)-�<�,�'Ke�!H+�-(��"���Ҋx��f��V�������~{�
�`�����
�<YZ�<S\����y�:� �j�ᮀ�xr|,/��ã9C׼�@�X��@����:��r<�v��.֯��'�;���,+����
x��0+��;)u�2s���+�����B��@]�������@k�%ʺ&�5�3����^��P�aC�kC	�}��%�����v��rjkG	<O����P�́VRp��a�~"V�ìٝ�!���ݧgJ[��&n[��pN\rۚ݅s�}Z�[<.������P�����a�_ϓ�R�h.������+১S�^p�@v��wcC.J׊��oCca�7f.L��\O�S�1W����=��,�ߥv؜�^Ic��v������~����a/�k���\��&۴���&���?^?���I|X">�@ć���r|xfK�I|��D|XY">�@ć����A��]������'�;���2D|X�"�a">|���t�o����a�H|�.� ��j8��j8����a�J$>,%��"�����D|X��+�a">�'>,��aO�~=H��p�+��Ƥ�i�y����u���0�v����iĽ9���7c�Ca?1��Ŕ��υי��?@e?��Ľ�pĽ���򉸷�S!��/Ľ�K����D'��b0���k���#��
D�[$��V>��*q��s�T�{�+q��w�Ľ�!��
Dܛ�[�{�(U���qo�!�͘F�[`��;����I�Ԉ�??~�G#/�H#ϋ��9k���hϓ~��;S#�/F�����N<_"��@y�MJ�c
��w6T�l��H��ٸ0��l\���Ф��Z`�R<gK#��x'-0��K�����ٸ U:�Fg㝶���l\Xt6�qZ�����@g��l\���wZ�&d��R��qӬt6�I�Fg�b�Ng�b�Ag�di�����ܛ�|�soa)ӹ� :��J�����[8���[Xt�͠�L�x^�δ)u9f:��:��Jg��i�jb��0Y51|/�l����f�&��>Y5�0ųU�w�8]�9P���%[-Q���t^-�nt^-<�t^-@�Ϋ9q��
���drOl�Β����9s6�7s齈����J���Z�t^-@�Ϋ)�VIll�Gi�y5�t^M�輚1�ΫS輺#��K�E$V��[�}�$Sh��+�B\ύ���W�%+��D���a-�I�������"�/ �lͣ��6}��[W�$ӿk�_�3<!�1�Ӧ'��8[�n{TJCV�K� J�kP����8/m�bm�zB���<!֖�'�4<!֠�	�-uU6V��ۣ'ͯ!��,u�O�;�0���ڙ�t�LT�k�II7&�r6�c�Ƭ�BO���=����J�0���7�x���77�N_�b���\*^U�f���U��k�B��W4��xAn4i9�LZN^nn-i����p��\�rWz��U��xU�-U����X�3�h�P��C�r�<��镇Y����Z�Tl����/i�+m�x�A�?�T�MY�落�̜�^��ib�����b�o��*�b~�j�X�t#f*��*��{3-V!��b� �^Χ���S�
)��b�&Fs����<],V ��a�W0�k��s1[�'n1[8'.qV-��S�
F[�^���]�����^����P�
�X}tS0Ґ�GO���W0*��arQJ�+i�z#1�+��^�H��\�S��I�s��r�v�~ݕ�����X�5"��)b�U�I7Z�JH���� �~�����vB]�Z�֭_�׶]�m��m7a�am[�r�m�_��@�,�`�眷!G��+����x��APc0��T�4/��!�1D0���E�׎Km��Dr�
�~����"���4.i\$� *�
�!�k���0@+��@�4�^�eeØ���f�z�d�z������r����y�T�^����e`�w�P�bN!^/���Ғ�,#/^��^/hC��K���]����b5���d7a�F�A�����zA[�^/H�^/������I1]�9)��^���de?d�de?l:V���qs�Xn4H��*�ᰡX�2�;V�b�}���i9Yɒ��>�V�lb4*^/<g����[���y����^/h���4�^P���+�$;P�zA[J^/��]/T+j��^����P�z�ZMs��P�zA���"��J���(M����^������$�$&{��P�]/�X�^xi��S�^���=KRF��8ELR
N�F^/Ȝٕ[���h)x�����TV����}��j�0i�2m�^�5%�<T nI���PMi~����:�|H�#��V�t4_�KG�c�D����g��W:���H�#��V�[N�*�|jH��#�W��4?��ծ�6��fce�3 h~����o�JB��ץ����f�r��d���
Ԑ�Gj䩦+���@��b9��Gjĭv	6B`e����XKs -e����y4o�"���[����-u��
4��+�D�/@- ���7a�ד5X:)�F�(����M���8ӕ��0���J&+�a��쇍���c�k�)�	��.�P��R@�TQ
�8YŒ���,�́J������<������d��&�i���vI1�X8�ާ�4_YjH�#5�V�E��_�1�Ch��"���yz:͈4�3g��Ɔ\�fF�/��S��LC�/0i~H��@���%=͏���B@��S��\�*4�s�L-V�F~��4?��͊��{Oj���P���{b7S��{m7k���o7O�ߥ��%�3�A/4���Oe��լ���*������Ci�hv��k1� -@���і����<� ��(��LZ�wiv��!��H�c��h�R�R'-�W��G���/�ѠHZ�.I6|)���Ip,�<�����Ky�pЄ���&dm	��UV�<���G�_ʣ-A�A�A�A�v����T��A�eUR*49H��h��S�B#���B#�U��t�j#-�)����n��IZ�}j�� ǩE��H�K!���u[�8��kh��A#�A#�L\�F�S�Fi�C#���B��!��6B���4BhP#�@�����4H/��Iz�0#�^`L$���Dz��^h#�^��(�����Jz��Ȁ�
�H4TȜh�УM���9ڄ;���	��4fh4kP����&���>4<�7����fe��}~����B��r4.�h\�� �l����\����wp�F�m^Ў�p�F�p�F�಍v	�$ݠ�O��\�y�+�G���]�92�.����;.����B�.�HK	.��%������r�%���Ap!G��B������G�R���@�﹃��_�g�g�*���%��%����p毽�3	*p���g�2����pp�Ap�}�3�g�*����Kp��LJ��8�S�U�H�+��G�u��
u���%������
u���^����t�K�	�k�sx��e:��P�^b���S=�������hv������	i��s�Z�y�y���̫�]�d^���ъ���R��[��<�ֆ���=�].yj7 �pg�o:�;��t#�y�O���X���꯿�CVb� �W{��Vfm(�q�=��Ffm��]�].8�n֙�Yۼ�}0&a!��h�4Dk4Dk4DK�x�@Oh�~��h&<�_�1�!Z�M�/�a�)X��`��`����v�	M�����b94���;���p�����`m	��EVF��`m��U,G��`m	��%(BS�AS�AS�t��� ���]�<�Dw./� U,���D�5���<���C� %
  1q��׉�
D��Tv��HT_P�Q}A��� |�T_q�T_��g�/�2�lRf�������k�/(����@T_��T_>�/K��7h��P}A8^�ţ/ՠ���\���t�Ck3�v���v 0k��Q��M���X;x~���Z�v �_�ţjTx��Y�����췹G@�����xT���ţ��xT��D]7��~��L�Hy�m���v*j�L�Fk�M2���Q�(C�I���ѨqX���8���`tjV��qX��qX��qX��q8��ѩq8ӽ�ѩq8SG���8�\����Ơ�aahP�Q�Q�p���cP㰲D��"���3u�A��j8jV�Q㰰4�q��2�qX��a�I���5+5+5+5+�j
^Os����f�{���f���LQ3P������h
�@�C�C�<qg���5�/P���L�3R�O��AG�
D��'�_q�Կ��Կ�\�����g�K�<X��u��Q����D=�'�qP���!S��L���Z�A-C�r@M���Pː�	5�0�QSLAM!05��4��f�)2�/�<PSd�_�y���/P�P�@�C�@�C��QSd�_����P�AMD�5mj"4PS(�DM���gV�e\��.6�
�y�0+�2�!�e܆��eh;P�������5��AB�� n��7�A�5���5�;�^/�5�� ^��@B��AB�����mP���:� d,;� ~��Y�P���AB5m	j*+j�� d,;� �%�AHЀ�AB��!�ꕴ�� �hP�0�5�_N��ŀ�j55&� $j59q'� ��j5�h��jrL�A���AP�>]�� D�.� 8�j¥5�gRf���j�k�Ah���AP���@P��>E�AHKj/h�j��5��ABe.BBG j�� $j
��!1P�x6�M/\�A������~�/\�B��8�	jj$�AȜ%�A�Ѡ����pa�!G�P�Png�AhCP�� �AhP�;T��sa��x��6�i��ē��=9���CÓs���K���~ EO�o�N&.L���5���ʍ��A
~%����6�R���9L��\Ꞝk���\��'�/�-���`���=�d,��m`���m!�۶۶�����kK͓s���}=<�74<9ױ���KKVҌ��b5�t��4�i��ɹt��g:�zj��t=Z���@0ݓ�_N����{I�h�9�{��=�÷�!+X�æc�2`�2�^�0�K��^
HL�R@.����av����?���v�m�ʍ��f��p�P�^8J���>/d��^IK���r�́���pO�*+v��^
H�MU��&+�a⚮,��8ӕ�s�}*^
hK�K�䤀U+�a��j�&4hx)�A�K��h�mlh�@�Ki(y) 1�K�)^
HL�R���w)C�R�}8;�K�ߏO;hx)��oM��ڢI���sE������~,.7���V���{R4E�M�}Y�}O�h����h�J��<�f /�U*��V��܁|�����;<.P�<_����T<ϟ[��S=ϟܘt��3{��/|sX����Qsa����P�ok|sX���Óۅ.|sX[�o�Xf���o�=+�9���o������|jQe��w����%��,�]bm	�K�A�]b��k|�X;�T������%���/���z7r2�˹�z�0�cm({�A��L|]����C��3���t��������&+���6U�yr;L�zA.����a����X[�R�;7��*7�$���+�ac6Y8J4�^�>M�d����z�G�?�)Fs���¤>���^��������Q�zA���2q�+���4�^���Z98��^�V���Ҫ��^Р����T��wŲ!�Ѽ^����3�^������X�%������"�Z�r���'mf�d�MS
��F�^/Ȝ���<E�h�녹]��a��z����p;݊�{�&k����6Y�R�6���Mj��)��ϴ�J,0���A�| 9O���%������xP&�-@����ɔ���,5"���t���߉w�_�s
�$����/�98��j�D�9N��x8�R%R-@�H� u"�4�T��9afK���W���Ӕqaa��F\�±C:qa�I�b����.�j��bR$�ô�!h�a���"��y��P�Hd��H*|$�1*P;� 8��>�y����4���©��j$~���D�\�2�s�S!~�q�����ꟙ�<���h���h��5��e���k��^[�s������^;����4�WSV:����H��%�Ռ�īS�W3�ȇSć9m��e��kK�x��g�g�ԉ�
� �:���IUz�����zKP��+ލ��x���h��_�s�?�z%�4^��b��G\�(D��`
T���1��IY�ʼc拁j��C9����?��������         ;   x�3�t����J�+H-��tK�J,�24��/NN,R�24��HML)J-.����� [+G      :      x������ � �         /   x�3�tI-.���7�2�1���9S�!�˄3-���SҊ�b���� ��      <   _   x�M�Q
� D�gO�	�q���ɠ�BP�j�c��,�H�.{�ZK�@GZe���8���/���3Z�n�v�,��O|]3�[�}$����D��Z�      8      x������ � �         D  x�͜]n7���S��M�� 9����$��,���,c�]H���~�xv%oy���&���ŧ_)�W����nv���WS���X�m}���޿o?x�}a�ǫ�xS��� �v�Bj�����8���:B��0Jm��#����}Ș6:tv~PG�J9~!m�$��jt�����u�.2ʆR�Z�����s^�.�]A���8+
����qWPll=>YG����(����z�
G�����w6�u�و�nCy�Z��k�b�Z�y��b���M���5�J�I�x�	:��+R�:�)h+��X_���%�ש�l@��u������:U�I)��NeR�&����5U{�TQl�Q�RC��G�J��^e����+5�x��lW������퉒�_?\���e1�槌�/�w�����,W�/���ۻ��EY����?S�D6�P|SeT��l95���;�o�����:�|G������k����&�h�RТ6���̈́�P޴��J+�E%(�he���E��J+�l��VHM4XZ!�����6XZ!�-��S�,K+��1K+�}N�V��w��3�PM�V��'K+fd��ҊM���ҊM��D��VeV��x�oi��x����n��Ë��2��7�P�Q��I/�e#oҌd�E��va����,ee෡��Ҍ!S�����LC�^��{�⽾��C�^�m*3�u1,f(��G�C�^�M�ʍ�����hW;z��W�S�x�������"�����_�s���)r�����cyP���"�JE�	���׻�R�Q��TdT�iV�j��c����,+^5��SV�j4�{Y�!��JXiK�ӅI^O�s~��}�k����쾮�\W}vwח�/���8���/����Q�޷	��!z�Y������[(��~<�b�U�������c�LGY��UePb��=���� ǊfMde���V8k�� +�5%�j�x֔����Yӥtb�fթ�R-�X��+����M/V�l!T��s���
�y�7T�l��k$�X���5�j,x�{��gi7��|�,�N�[��-���[�tj�Tó�e��|�%�h���<��x�O�<�|>�CDu@��)��:�ϥ[r�C��tK.x(�0���C�\�%<�jH�d2T~ܥ[r�C��4�%C%���̣"�.�J5L7�Q!r��b�c�Fש�R��c��C.K5��G�*J���Ee��tK&_��-����N�ju˨<���w����E�Fq�=�j�A��ʔ{���B�^��*U����C��<�=T�|�;�
�/x�J�dR��[F߽h�-��ǎ��.���{����駔ҿ5w�V           x��\�R�H]��"�3�!�޻���`�M�T��Dm�vI�J:%1�����舙_~ln��R
�TMGw9�2*:����s�p�c�l;���2[��H����=�L���#[:.��'=;��z~����{��a;'�{b۽;��o�'�wb����H�k���f$�ٚ�k.HB34�♤K��tw��՛�OsAr2Oh���bW���������������ј���_�+.�),�B$�E�ȖwZt����]�G�(t����E�L���stA��Ds��i�.A�<)ҜFz�	����4����ay�DH�p�n(��D�q���A�
��ш?��.�7Q��_�E��\�'�=q��H�����;r�h~��u9nz��k��,cz�h���qp�q#G��q��q�o��<)���}G9AWW�'��|�x������G___�`�k��]ޗ.���-Xx��ڗo�d���9���Le+4L�����b�R��mro�`iX��a}YmX
�Dܓ�e9A7t)Ț �9#���~|����ǣ�x֎1,��9O[^#6��'����	h�O��Ձ�h���!���J���֐�u<���lA��Ŋ�\�\���˨��z�>���a /2Q��D�,�Q	(�)I��I�l9�.φ�x�C)[b�{��'�@Vᣑ~�B���P�����^�/��E�7jT��͠:{����N�{<ԯdYu���gd�/(uj�3�cA汰i����!ݦ!��H �3��MyF� !������%�H��˝��'�oѰ���Y<@~%"���"/����>�32MA;o�4(4JAD�sC�%)��>)�wM���ҏӵ)��(M��$�S�H�	[u�!�@�Ct2P�"�	|iL�ve�H�R~��$���W%)��@s��j"Q���.N�T��B�V��g�b�j>m@4�=S�,K�W�	AWEҭ@:v��հ@�'2�F�ה+��Ϗ�Z F��u��>j p�@���⧌���a�[�]i���GF}�0g4M)t`����_]�6��Ȩ^�t	���x.�̲9��xN�{cG
�a�ܥ���7FFu�r铠M��>�޵"IQ�RSU������ K]Q���-P�DJ�M&�жBl_�F7��t���%�p��wz�m��4��5��YoDGh���|{���
k�b)�Vh���W������?x�)k��D[�����ݲ����K~wT�(��!}�Y�7*2h��D�m�v��#OI�U��bБ�ξ��Kw�1�/��Vn�~���{�F����?�(�>+G*aA�q��aޏ���B�E�g��Tr���X��")Jr�f�� �zĖ����=��ð�Å��ГXd4AP9�]�����8�)���h(�n��ׇ�▢iT9��z�wX�kĢ�_S7\���_՗qz���q��n���!��;%/�Ep�@��).���F	�P})�౨e�]��L9�(5�J�؅�NG𚪗'��cgj}��n3�$��Ƭ�LC�F�?l�g$́���`���T�Es��k����و�:/�ط�� Dz����Y��P�YJ��|�Ӭg� ��B�z�IGu$aW���
�-p��`�rF_2�N���*������z4�d�������I��~E�BW���U���fi������,�3D[��\�H��٢���(E��hWWF;N��6���k��!l�aT��o(i��Cج��R�I�-y!���G�w��
���0:tG��&%[U�76u%��V�j�����M��xv��MY2�8]���*��&�K �l��yT���:3��a9ܲ�ȴ����k]��F4=N�D��'�}���-ޑK-�IKQtw972+��z|ٯ�	<悦D;�s�Pt_d���ԅ-G�.�6�6*!!g@�L���F�[@ڙ�;�}��R%��:㲛����/X�`�ty������v��j�Mw��=J��:&Ã�v���r�ց�L�]�.ǲv`�,&VBm]�PS�5S�*
� �s���U�b�D�҂"�"��i�Ki��Tl�9�Ce�:�w7�r�F��k���.
�$I����'tE���eL߃��J�)��G6��j����
�QP�V(�_�]=��z:ԇ�ԵT��q5J�q�����8�*���`T,�6:Mef�p/��}|ݿ�o�h�'�x�Ng��:��T��Ou�_�4�nIu�1���t�	}u;��/�����6�CIC��eB�����-Ie��	dN��ˏ�W�������.��d��y���Yw�"�R�1t�����D#
J��e)��(a�Q�!�m��k��T���X��W�m���;A^�l5�Z��Lw��f�q�߼r��O`��<��ADw�!�M����xC�쪳~3s�q�Y�6��Q�.�`ef�M	J�wڬvU�TT� i�W��i�8�����jEL ;���
F)+uE�D@�v���D�ؘz��ꄾ���`��S�kÆM��Y� ��$����z�]%���0h��c9�㫊{�Zג�����c�sA��Ljs�$A�e!�z4Ls��#I%�es��\���Oq�]˓8��8=h��'q�I>zR�8�'�]��y��-R�1>��p�n��$٥�ʣi���� v�(}�4Ul�@�6�F��W�/麐k��ek�Ƿ*�<��MWO	�z��>�gZOK^g��1��&�d%w�H&�~F�; z��j�}[�q�-HC3*7lsM�ySLe���u@R��Ak>.��;<5G4�:*�p��Ȋm6�)U�/O��4>D��~��L���c��h?��4R���M��w�h��8]8��mG�v˝Iw#ɛ�;���35A�>�y:�1��]Q�Eg�B�s��\1?TQ��)fǙ{���Zk�@)�+��}��H�2Z���
�o=�[�3����y!i�~$j}B�o���e�^�~v����i����T.lx�)<\�;l�Y���.l�
�s0���>����=ϊ>C3b��*&���+����� ���{�>�n�Vײ,�l	e��r����pT���v�W��,Rщ�x^O���xt9Lz�=����=%R����Qh��~EXr��+�� CEr�Z.D�_B�����p�ѳm����zz��X����)�����,��c(�p��	]�]\7�A����P�lKmD���/��'v��9�WsQΛ ����G�B��Ry��K\>���o���)�[�-�������~�{b��C�]����f5KH�y~<��4��֧o��>}��^��      !      x�3��I�+���I�440������ B�(      #   u   x����0�����Ox���1 it�"�"�:*A���%����Ջ&��x��Y����&AB��<a�$w�ɐVmyc�V�3/0X
R�%򊂢�i�����9nQQu�3_���      %     x�}�K�c9E�齸C�/K�Aw�j��(����\WDN2҃+@(�����ŏm�"��#�av�s�������7Q[�Y��b~,j)n!)Gq�Z����E�X�-�[��Zt��W�z�n1�v�0��'��,�=$�]�S����B��1�\-���c���t�Xh;Z��I�ZU�V���x����Y��,�X��V��⨩��.'���V�j1�������S�C�jqTL]Ջ��bq=�^-��U�C���m�h��؊B;X���X���z��Z����Q��P�}�*�vh	�2XK�^'���75��`u8���pu+v@�� �L��:��j�\9���
�Q(	��j��`�6@�ms��v���<��+g��-\8O��p��`/���H��{�P;��&C���i¿�q�B� ��82�PG�|!�D�p@��4�-��,��7�����w��P���)�	�Q���B�+WB�Aen��H㜻��JR
QH��쀓�U6��9Լ�;��U�p+$8�fHh���B��C��bl[)�
q��n��#a�[' a-@�6� RoM ��%8.+�
�pd7)�C�3lT@��̡;\�F��IW	ԋ�Bd���̡UB��(l	�P�7�w(�~�vv
-a�ߔ�
䋕�3�M@T
+`��6
;�5
Si��	ȽM��8L��������&�ir��&�8D�dO�Æ�v���?�lhoN�`B!ʮy��(�(��0�
q�*�|[(�-�[�Ia\�B2
'ʁ�
u��	��~����������a��1�y����;�8�Ja�ۢ��Á��p�8�aQ�*�I�;�,o�;DMgG-�PL�>�qm{����ОU��W
J6�;��v08��j��}��`te���o����/QHB���N9��_*�-�>s6�ì�U�ۮg@���z�T@L�c.
Qe٤�pWY�pW��2�MTٗmw��mQey��!2!��;DjN�ͅ�^�9;�+S���W�kOEc�d\Bx��!�q�O`�'&�b�e;4�9�nt���,�~]	��q�9[�
w('c-�P� �`*�"��x�]96�7��e'�
3�Zt�7|=�W����}����w������ĔZ�.��	݄��m�	��f�JL�de(�O�E� 4
3�,���7ē�r�v����!a+
E�9�(�v����r���)'X6�����V6�Aa*�� `�0E��F��96W���96;
!B�7!B�����MEН&��!&4
' whr��Y��b� n��5����}�`�[������g8�	�o�",!��d!¢q�dܲ�(�O(T@�PN�>E|���5�[N��	�^���趩P�?��\�BW`e�C!��m��癓q������B(�e[(���!�k�@(��Th�-H�
�ƙïCJ�i(9��V�x��m �v+9T��˙��n����y\��-'c�s2vxvC��d���7s2�u
�ZJ�������P��      &      x���Y�,��e���/ۡ��D� ����'�'Bf$.r�=��LF�$���2k��R)����zO��ДT�i������df˿�We�%������]�^�B{�ۡ�`zm��^�~蹙>]*�H�C�%#с<��_][z�9�OI�^�E�!s�u�����A}�3�e���y�:|���������HN/��z��ǅ����:s�q���t[���#Mu��ǢT~�I����u�y$$U�a�:��dj�3f�G~���E1�Or��9;��ȟw�Q?��W���g�.��w�h�`:2�E3��S����Lz����|�iYZV�9i��##���g:B,��=��E�bVf��U�i�Z$T����9"1+�-�o�L�%�^h��C�3�����Ћ���ti�svH4٭OI��D��_9��%�V�o�`~�O���/y>$��#���xѷR��*,�Y��n�"��R��UF�-M>>�%�kMF1��}?��S�e���������*�k��n��k����p5�K��[�K�o�Mzb�Ͷ�2���U%������^H�����<�]g�A�߭���_�����<z�G�g	���l���?Rʹ~�^譻[��No�o��]�|�1/#0/���v�}��非��y�uD�9�M9��ϻm�����9=��?�v�|��N|���y?������ʟs�@kt3���Ih�
���k��i�Z����K38v��.�؁�~جp~��˳���<^`I�W���������n?���Bg����y�NE���(��N#oo�`��e����x�Ȭ���Y�Ly���.=eF��9 ��ņ�\M�o��s^��/�]���䏢ꛋ���-��������{}so�&�m��ȳ�mؚ��a��#Ϗ�֜�s�G{��~�>�lͅm�%$�l��p�ͅ�z� ���9�'�z�Kt��s�h/4���c��ܺ�U&�L��i��9��'��clѽ8�V݋y�
����Ft���'��Y0h/�Ĺ'D/�{�]-����G�B��w�z�[�|��Wz�gC��֒�t���s6R�{!3�)p#�2�����	��BϷV:Ѵ���:7����F��3���?>��ǅ�*�F?��ə7���7�Di��Ϊ�Ҹ��ר%OHTme�h?~p��,1����?̠���Y���/������^����A�*S��~�wz/� ��R���f�]��9�	��\��v�(W>�ڏ��rM�����?1G�y����D�x.�ڢ�{����l�<h���A�P�;��[����+�2���л~�����_������>����
~����"3�y����E�Q��?8��ȼW9@j�Y���zH�����{VI����>We���r����2���<��A��g�{[ο{�y�2�KuxhP�m����fhֳ����*~04�y�\�D�"�>���,��{��9*�׷��"����͗�sS��֭�ώA�]����j�~P4�R.��Г��Y���?����?�M>7��U����W��l'���e��L\�=l�(*��S����̳�\�o�ONU��%[��?(��;ʒ��~��*W��Yt����@fz��V?�j�oS�/����LW��aʎ_���k�����|���VI'D����Ns��Ƥ��/�u?-�ď-"/��f�];z
���Y��T��ؘ�����lD��H���u;2߹�� ?~pjC������8[��i2�[��[��JwS�n�3n=��HU�@�}"��ȏ#|.����2��OXش�A�M�=�B�ܟ��Pu�]���s�V�������A�w�?`���Ӓ{<�Y��;��-��헚In=�w�){~���֥;���V~���6C��,��~�=�y�'���=�����E��9�:����4Y��,ѓ�����\r��7;xR����]WNuSO������8��XT@���oS8���v����1xW����o�eV��)��Yb;�9�_����O��U?����SO!�Y���y���.���g��l��EC$��o�ڗ۪��l����j��w�m������UE#%�&9�?g)�,/ݿ�ґ�����DnF]�������,�5jz�3�6?֤=1Y���ʳ��Ak+��+˔E<�/�f[�3�^���:��{%]���3�l6#�f����S����_a����Л��u3g������B���~�_6���tw�_]ʗ�I�D�za˰�!��c���,��Ys�؋��_N�37�,����T'jxOE���o�H7��$�q� #����3�i���-}�%<�-�qY��I�"Ϣ�E���?�y%��ڃ{�7�?G	y\��GR.���7-*_OG�Td4���ڋ^,�
᱘�QK��D�t�˨��"o\hW��i
�G瀭Lx|�G3�A�<��f?.|����[t�8��?��[���=�����D�܎#$y����_��}&8�!'W��4"vB_�O9�ӡ��y��oѲ1_W����?.�H[N�����n|�ȅ����3{ޤ�G���y��h&��棟��32�3���n�Js
�S>u�Ĵ'�r�X�z�|���A<��;��Y�ϳ�{V������d�Y-=����Kg��.=��Q\��O������i��c�̵*p���Mnܷ.߇U�rQ�����F.��������K/`��o�7���`�1���Υ��?.<��{�����/?uo�aA�f?.��]�'��î���@���]��������'���y?�F����/oV�#{Ъ��>�&���.r� ��tb�+�Xc4���.�ɮʴ�MY�����<��:u5Z�Y�?.���S&����-��Y
A�4<�D-�(�程�~��Y�^Q���*{}h��B̺)�^�Y�k�؇j|�X[�>T��u�I	�zǌ��`��y>T|�5�s���r���$��V�~q#v��!�m/t���V��Z|�96�	�ț�K�L2�2�����Y	}Xd~��s���X/�Z�ߊ]#�"n�g����@Z�D~��h/4۸�z���xisa�o(��N�_���N��Mߪ3,�z�RS�Ç��#G饫4�}����j[lM(����J�^�3���:�v�v�ސtM{^;d���ǞI/+j�m�}�\��z��ݷ�mG����:��v�z���F�XO�����'�]#��y������k�����FB��w��;݅u֓X����O)�{lSmՑQ����)����{��ir_\��&��g3��&�v��P�?m���.�� �u�"6W��� �ˤ��u�Ϲ�����݈��s�m.l�N_]�X&�՝�eߛ�{s� Ł��-�xó�g��Ϝ�^�����_����nX.ٱ:��:6�,s&6�c��+�Zs������o��Ó�x%k/tV� �%�̟^����̩y"來�;�t�V	eZ��,"�[#Vm������Fa~�f��f{c�{`�ٓq(펛5U�a���9��q�+f����Z*����	��y�C���������n���k�m�xw�wbڟq

�Y�,�_�ё���y`��nZ9z���8B�v>{_���q������sȏ>�V�yo^j��Ow^*��$4��S�P�&�>�����u�����[sa�����Ӭ�_�!r��"�km/4"u�����"n�zZ��"n0�"n0�"n�z:��N��<��a�l���64�:����F�`��:�#��83�Z,��I�]7uHDF�k�[O7uX�S�kqj>;L�tN�m����B��i�kt��)�Z��v�s�� buq~\x;�b���qj�g��T��z��c^�^$�a���E��N��~aC�^T�afyV)�L{ps�b%�Uޣu��B]�`��c���,��P��X����}�
mt*?o�ok�Ҭ�"O ��d}�����Uh1K�7��"���F,ۀ��do�P�83GX��ЕDإo�����K�g�9�7�~�wfG��-YF��~[���9�����rvk�͓��N���%���9��A��w�=-�X��)������Ͼ��2    �34����������z�Ms�Ќ��u���'n�L�38��H�;q�$֙��[flԸ9�����#����Ht@fY�;�ww��L��_3��7+hl$�9��~JN�գ^���Y��ֈ@�s����9��X��`v��kn�^h��О_=
�',����#~\x��W��|�9�����=����,r�,'�`Ϛ7$Գ���~;�V=ǥ�������!����/�~Ř��'V�c�g��X���V��MO�����Z�j�f��>vX�I3�z;�Zm��w�ʡ���v�+�Ɗ"���pX�)b֙��>E!V}�"��o!��R\�zE�g���KH��~s;�z	�zV/�Ј��W�_g�֡^B"C/{[����T������a��'ԯ~�B�����{
}�2�_�gL4vc5�lMXͪ��h.l�j�uYN��ڋ�f�S?�.ϧʙL��+�Ȋ�'$�J}vï�%w����:�|l[XoS5AV���:� ��#}��l9%���1�̑<G���{n�	������%w?9�P�QK���!�j�"���$O�9ci����u�[����#?�ء��k��W�C�7��+vة����;�R�K���m;:旼b5�ɕW��W���do����k?�6�� �����+v���H�K����r��ZD�^sE���8�[Sshl�ěv���J{�g<d���:���>vb��E�R�m	k������@�E��μB����=6ߏ���`Z��i�ж�z�����͸�m;��l�^��V�"�����~L�߮���X�^�ܮ��2�ݮ���Wx��ê�����PKȐ����:�Z�C�^�;59e��*�lKoW�1lh@�~32����x�Wm����x��S��?��B-#7n�T+w��LS`MS��4%.[�a��{^��.X�d�y�?l�����;��p��=�>���zbu���1<y+-A�l�Vs�^��6�p�a3a`+d4��4��Ѭ6�O�P��}��L�}��ܻl�����N|��v4�sA�0\��7���4��0�]��7,�RQ�Kٟ�ՠ!���EX|Èun�k�F��|�s6mśGܶS�����������=���sѮϗ������(���z'��K�V|��I���#�"���B�����&�v��ͳ�͹dý�t�"���2��n��P���?c������_��i3k�(M��,F���uOh.l�|������;�u�q��.���� �\Xӕ�	�/��l�^�PN��vh���c�O����Ć(�۽x�/"4�)a)��\ sY�gD1GzFs��ޚ�ԺFܯ�O؈Mf�نH�" �ӱ!6CG�>[I&��]"l�*YrN+���:<M#[_��^͋l=��7ɏl=�ƚZn}�ʾ���LU���ȻV�d��X��X����	�z�XϦ����,��K-�4�o���E1�_�S�D�5�S����^ҥ�����V/���4vcU�l���vn�Uo�-�"B�X�[�n<�vn�U��Y���j���Xꂦҵ��H�@���:wݪ7��(""�h�x��4D1��ɻ���w�{.�w���t�'���ߓ+�a!�|(�$�-L����S@�;$�{��B⻧;,$>����J���F1��}��!��]SyHȼOB�{re~@�#O�};�N���y���ȱ�H#��|��ľ���2M�C�ɼk!,�d޷�u��4��a-�!�6X��FY&Î5�,�a�BY���?_e���6.�{w�&�ŻK�mR`m/.���l��8qoDG1�޻�V�]��ޠy�D�Q���2��^j���C=��_�g���~=�פ��ү���Աϗ�{w��D�߻�U`�<b),,R!q�g�����X��.�/>�E�.fw��� ���zu=���]2G�2"5���G��#�!Ի�7���]�
b绗G��$4
��Ez��[d��`�~�$�GH�Љtֈ�6[���g����=����tH=���ʍ�
��`�z�ȏR+��L�Y/*�;)���Tj�}&2�-c��1�=���6�#��zQ��"с�;��a�d�����w�eb��l-�����ݜ1i�3��"�<��L-o1�ww�\���;���r�g�<���Fb�����vD��P����dj����P��:���Q�E/F#ʶ�yZ$�b�h�v"r�P���FDC�>�6F��'2�1ۚk3�g�#,텆���Y䬬텆?�ɫ��e�
opR'�q�������NTd�.W�'�<ł>��>0��:��v�X��I�n"�9�,d��<��K�=���n��nN���6��7��rX��l�{�~ﵮ&�n���n�N����]Mn�����e��0����<�Z�_���e�EG����������.ZB�����[�m�%3<2c�����e�͎�\�V��&}����2r��G��zk��",�!��6[�?���TC�`�y(�4��xY�� ��p5έ �X�E����a�٠���a��
k�^�D>��(*v��V���d86�V���I���'��Z6��C�6�",n������^h܉���Z��Yp��3�R���8������N��f��f4���K�b����G��e�?�k��ctѳў�M[�T��~ȡv�@dN��$����r�t�]��;�Xh G@G�4���4����d�ߊ=��5A���y��M�p��q�J?ǁ�!7�8�&|�",|�",|�",|�}������Bw��ʇ=�\W���/<i.,<�-u}�P�O:��.��m���t<foM/���h��W��|�",t�#��o�t���~X��FF��@�w�@�w�H��~��C��?޳�7~��}zxy���,@�aa��ٞ`˦����,�Ü+�|,z�-��ώ�EO�e�����;�|���]O�r�h;�7O�z����f;�7߳�g;�7�fh	"��s}�WH�vZo�r߳�}��g�����ܻlK�`�> �^D��
f�~M�*ۋ�qHf19�v�t#Y�����=��{��9��9�QT���(����O�&�.i2�eS:��p�L�}V��hC5z�%n,q�{�Y�z�%n�_��7B���`��%�7h�c#�%n���n�nG$[k����gk=4,q#d���vD��n�k��v���n��F��-;n�gd�~���-�-с��l���zzhd��\��GF���j=,2�/W�am�	��uK!���[�[�=�q��2"�Zk�ܸ�Ϗzhx��hd�^6��"�J�g�冗��CO�3���|7%��t��}b%LW��%f|k��M��N�3���|/�S�t5�]��&󋖾˽T��|��V�S�E3b߭�}�^f��P/30��Y d�9o��4�3|M#ޚB��N����ѽw���/���ս��;�ߑ�sa��x#l�z�|�����r+�¾�|'���7"�g gܐHS�[θ!��$�w�b1ՙsf��c�X�I���:9�F�o]�gT���}dT���q#�h`�@�`�_�io���Z�ӱ��P�c�ŷt����%�/N�>.3�3nT��rƍ��XyF�^a�9�U%���5�f�9�FEޑX�8�Gz�e��?�vW_X�aM����b����G��nV�3�t�մ�+]���n�~���F7]���|C��.�o����H�盀>tX覣�:��C��>X��0`�����EXX�x]��i��B�B7���K����BG�k����BG��c{X�8�E�����/=a����{L����z㳞��."=�>aa���Ø��Ez�XϮv|L��~��+m���e�ټl#^��<��a>�ӱ?���I�Z�k�Z��,@�aa��mJ�	ϗfX���w�؈=��k���uG��I36��v<i�F��X6��8uFy���v��t��S�_'��k:�32MM�Z0�7WG���L�s���T1��Ysl���ơ7ִc���5>�fB<t1��z�}s�X��+F؎U`'������l:��� f6���t    ��=h�:�YL�8|���|�1�� fA��gu=t���2Q5+",jVDXD��Ĭ�`�\�>�\��E�
�7O1+�x#�@od���e묈��IԬ��q���X[gC͊@�5+",21N�!NY���8S|�¦ϑ�{!�t.dӿY�|�N�Q4A�:N;�s����h�����'�T�s��n'��^cuvx��/��@ڹ�%�$N�[��N�n��N����!��9̪�:���h�p滬c�D{���������0�w��;������]wr�&Yjg�RK�=���Z2��q���9mWؗ�SI�gT�~E�:�N����N����(	��v��f���h��Թ̮�eΝ�x.d^���=9�����L?��B慕B3n^�+E�7���Dօ��9A�Khڮ@��.+G��F��a�!�9�.0�f]�2βk�zGօ��y�yDz~{�T�A�����e޷�x�+Aam�k�� ܯ�Y	���Fc,�q��@G�w_	���,�@��� DX��ϖ�7�٣#���O�煰2���Q,�ӭ@l�ʸ�/'�e�s���`��Y���;�*��G�ō>��Oh,c������>�����Wō~΂��Kh�g�U�%�\����ys�£(��Kh�6��Z1�g��20ԕ��22^o-��Lh�Z+�B����ʷ��#$��"��?�r-n��,��G(��Gh�h��]+���'���Z+���Z+��°\��b�]^�+����,޺;��}�hKjD�X��C_�5f��n����+`q[l�9�3�X�>���gƊvlc�﫻GȊ�ϙx۶��;��,�VV��6-�3���{��9���$�����Z�p�~���]++`Y>+˵����������@���˵����H��ZY�=lmx�D�E\y�}lx�,��6�V<r'�ǻְm5Z���V�%��k�e[F�X��UܤB4W/��y���Uc����ԇ�J�ٽ�6�͕�_�MjDg��4�͕H�W�4�Ϭ3�|��)�jF@f�+�J}h���?[i�D�栖1���[�|<���?���F�E�Ƕe��e�k�Q�}q-R����&��aۤ.4�d�g�j%�;�iMF��J��W�i���L;�H��"]��硭�
�"�V�ԯ�ԤV���!�^��&(��W9�i��$�[�tX-��(�i`V�ԯ_Ԥ
���{�E����t�H��"<��"��i�H�}��V񖻿I
�� kRO�؟T���&�ۭ
ФZEƘ�OmM*PT�o�nn��H�+�����O�� ��Yk)4����K�a=�__��3�rbu���� {�[nѦ�-Z��v�Ļ��!���M����A�wk>�7�$iͱ�Q�<j,׍*�٩�,Kw���B����2��������v��/?}��s|K�/�+�z��\�9�������s��,�j��?Ƿ�s<���������/9N�Μ3����s|�*�����e���1��o��z�o��2^�,+�e��YV��x[���u�\��Rg9�m����ag�r\��Ψ��#p40�k�o�Ȉ�8^�`g9�-�%�B�{�]��7�\x�zW���.�ֻ�
ʻ [o�El���CËoj3�
?��\�9ֱ�~��j��P���w�o��\�:o���>4���bkͧ���[�
qj-B\�,�nU������f� k�Z!�l�˕�f6� ��BV`�t�^�����i�.��zy����n�N�qt�����l����]pk�n6+#a���a6+������Xأ���?��X%v`�؉U�������F���{"�cj�i����{��G�v�߇h����z{�`���^��ɽ�pO�{�l�����f�uj�er��/�����er`M�,�~��ܳ��{��ߐ{b]�ߐ{�]�ߐ����!�1~;���!�;��!�ĺr�!��Q@��Q���ӫ$2��<`E����ϒ�|���GX��۫I|X�x��&�~��C��g���I����ػ�kIK��ݵ!�l����=�V��M��Q��;`�K�$ޱ�b�&�nv�����ךe[2J��߫Y�%�����S�l�$ghB�{������6k����}��Q�_�;"����/$�C��v_�o�h'+ѡᅺ�^�L�}�^���Rh��]4+�o��[1ˁ�s��"���^��y��ݰ��l�l��:�#-�N��F��NW�#M��1�7���1��:v��1�!Vc�C��ϫ���� ��oϰ�y�-�.c��G�Y������(����pH�����G�ƺa'�b#Z	vB�ߡ��!�b-Sl�Ȝ�B�ݰ�i'��ڤ��k9��e���SS����X��ï���^h��1�H�4kw��X���a�g��Oᇼ�6y�ܱ��'����j{�VG��&|G�؄C/�����Cn�%�\	�Ë78l���s���1��]`7M���5�@�w!�l�)�;���=�={Wl͙)��9=�V_���
k�ԡqԤ9��vl���Y��C=�?���������&9�k��	?�L<Hj!'Gs�jƗ!�l_�[t�D�*~�K�8~��y�݈��ȑ|h��ڋ�?���xq���o��k�q����؂,�,̼!��.��.�]���<�%4�ea�?/�I�#�s͘���Z0�50�akd�3XC3ș}
�w���]�9Y��ȨQ��#3��)̻3��(LdQ��ƞ��
�&ӏ�Zc��4������p�i.,{b�� y��5k`��^��ts�z�q��y�|���/�N�~�ߡ3��~4ܡn�^��a+n����9+�=p�<���Źv�~�w�T�]';8i��<�2N�n�%i��)��T�uxȆS�Kvܐ�9+i��e=,��H�7 ����$���7�v��C�{s؛��7#�:�6�����úyG#��{Ļ�I��C�(����KM*��!�JZ`����,�J��-_-�/"yl�ޑ"`�8��X��w<7�U�(3���Ɖ7����������<�@d�Tg�W��=evcA����@��S2�'�Z��1�s�{ 2�5h*��#��w���TF���n�O�v����v���T��Ɖ7� �z���˶ܤ8kbB�ڃ�v<��� �U�]O�&U����Y##a]b]��XמoL���;�X��by�8��@�!7⥍�u��4^���|�Tº�{�Z�%�F��Z�q���Y��]�a]�s6�dvb]؅u`�B%���5�i]�X�wv���Ami�f�U��r��ު^ZMVG��j��Ѫ.�b�L�:�t�]o����-���U�z��jۆ�7�o׳iq5�R��X�S�t�}lXBJrV�%�#����>߿�=i�E`v���1����ħ�l��!G)ӯy5�+�Vw����^КHeo^��*��ͫ4D7='Wߤ��S��f�G�R��ͫ����_�QDz����i��X���q�X���^ZO/��=sl���,nF�^�z� [�Y�S����,,ľV%hZz	댡�ۮ�T�f��hN��&5�Y~�ؐ��t�\������E~���e�\8��;�'���؅Yu�p6��'2�[���5�͒Y]���H�(8��E��^F�|_I:��
��s[�/NjE�!D۹��B�J�c�X;���S��b�C�ک-�o�ꯡ�?����>,�|X���͇�%%�z�v�)��w�j�5֯��l��o~� ��k�\�<�64�� ������x�w�I��iS�C�)D�׶ҷ撖'|��ݰB�H|�߉�]�_�$-�z�co���#��w��vWq�l|�*�$>�v�b�ӓoŖ���]�[�CW�}+� �[����MT'Ze�{֦!y���$�=+�}��K���c�F`�������ed�"���l��l#[���:�z��H�'�ig����whR3�g�r�h����l���q���6׬7�Ux����n��t�9_w�#j{�}&���'k����    �V�rN��TxtR}'/zaT�h��0�I��"�4���D$Hh���G$p%h��v��N��Fj�cN��;ŋUoR���ǁg�;h��;����{<��@�Q�/r�*(5�����;�������@][���@��4�N|���?�w���g����v�*��n7|��Ѽ��o�J�|�ܾ�~����ڪ�n��1va=Xd,氘�@�Y#lŊ޾�^�Fw�G�&<�#�X�{��'g��'5�g���(����I���b��1�Bo_�[�������S󌌰����]�v%�]��EI����/���i󋬮�j�_d��J�!>�5��֚iL;�a~��Q�/�YgMK���4JӼ"kz_�3�+�'�+�"k�ֳT�^-�/<(lNX�ُ�zѼ�9��-P�E�z������=nP*F��~���ȿ[]��4�Z�E�Iu-9R3z��~����=�s�g{�8q�� �t��
rN׀��F�Zr�pR3�גK�W]�4�Z`�*�FX�[�ŷSK�h^ŷSO���h�\%��k�q�L;� R7:۸߿
Z;:	�JFE���Z�"�N1��<f�b���eez֌��|�_�����cU�Û5~F�I�R#��&ՄS\����]��ԓ����V��9;|��9��ҳ�XTQ���Q�Η>u~\xd�`�-�K�#a�rf���/M�!�j�n��&�x�ր�ܟ����6�2��*�;�l�W𰈲���j;M�F����{6/���ͯ��}���������<Q�+�\��DXxԀupNhf�k��ӼF,��Ԁup.DU���ؒZ�,��T�f)v�ms!f��6������̵�9���t����{%}:�{�M���ԛ�=B�̻�_\gZd>�d�/FX����m2�=9��"��d��2�u�u�K�h��m2��[k+�̻�Ƥ�4�|�_���˼Ԏ�9�s6��+�5
3W����V6�wI�y�B\��ѳ��7��X������&�Õ�b2`m���-գ���b2�M���$d�U�w�rH�i��@��s��V�x��j����I�S!E*M�!m�<�I|�5���.���_��Ź�͒���C[��9�4��oʎ#�4m/4K�:�f�ǅg]���k쿂�#f��=w}�����q�ion�����_�e��+̟����������Y�2Gp�Efg�f��ґ�H��8�������F�X� =2��RJ��҇�����Ej�|��8��e��R�;�a�ȓ�ۆ�p���[�I��i�ڿ4���1����Z'��l�{�n�����m�P���V��,+�L]R1�2uU'V^���έF�tQՍi_�ª_٣I�x�e��n��,6��:�T��=Bv�Ӽ�M���.�\��������T،(�_��Y���O�h.,|d�����#l��!�I�Zy��l�R�}{5ۀ��R/��#~�R%�mQ��k\R�
��5r�w��{*Rx=�n�#nͦ�bbߵ�R1~V���-���+�3|	[�����k)4Ѭ-�M&�m���^Eg�%w�W��nɝ��=&��������xw���
�oX.[ c�֑ߠ_��L<nV���3nޑ��5N7c�wm���P>�(���{�6�ƙv�Itё=;��N�onV=�C�^A����;�+�U��2�X[	����|�[�u�v�Ra���w�OP�^���\���4;��#(�y6�E��'�/�����v��GFQp����tٜh�]p��I�EƊ�ls�Ƥ��j�~q���@�Vr�?�<~_��@�@�:+��7��O�T(�:bG���+��+�}"�Λ7�+�gٯ�����5�+#�"�-�/��䆈��(��V�������r�Ɍ�쏶#��/�K8k�ߎ�`�r��>����>W3��WM�-��Q�j�mY͎�WSm��� ���ڄ:�܉Ď��Uk��`H�A^����y]����k��W�œ��[�>����3�V�=�3�[��$�=BN����m|C}v��*�f�� �(6~N�,�H�kt�s�fIMB��hD����r�A��?o�^�dk+�T&��n��%�	�Π#��l�l-PckoĳEzF���ھ�*a�_D�5��x�:�~�=%�S	��nU	eޞ�j���qo�u�4�Z��2��
aaw��XgUw�KX�v�i�Z�|6�N.�.�yMOwM�lm�k�K]�l�~]�=eD�5�~w�z�C��HgFD[�5m�^� �-�3W&�5�i���&�5��lͳ��T��w`MG�GAœ�n�7� i5������h���V�\XT������8#�^h�[I��s�}������}X�[���=����h6����.UyE�y�{j��
Ѧ��l;�5�U���r�+��t]^w�܇���0��r���d��@�f���&@��mڮ���C�+0^�ayQ�5V�_ĴEX�w��0}�vs��tX��{vX�am'��aV5Y���4^d���������:�,i�D\O������E�ķӱc,b�",b�x�
?��q=��Qy�y�ᇅ�̛�����Aq�ѶY�����),��hWjq$]D�ltG��BlO`���>;������AY\x��[�뿴��<[�>�$��k���w0�Qj��c6T�"���>�|\x>;h�#�8i{�9S����x�-��,�g<}Sm�Z����f�DQ���D��;^��ʮ4�^h�rW��/����(;�Nީ�H]Z��ޞz���"��a�Y�
]�=7h�#=�����uP}���ra�:�q���Q���~ƶ�BO]7[j=�����ۃXJr«?��������f}h����5��zǏO3��Z������f�|�Í��뺌���霗�8�X��X�k'4nΉ9�4�E![M�ƱL�l�oHl��D�-U.�=�W��������7��Nf)��F���1-����ǅ��-�޻,|m/��o����j���2H�2g�(��_��z���� �w�%���������ǅ�yV�}���\����B��}V����X��R�4k�g�6M���گ_M����+��h�e�g�{S����F]�ͺM�� �lE�=�n�C����s~s��Q�ڈ^�8��^�[�8�{��}ڲs*��+fO
�ڲ91-�����w�������E�|ć�5��#����'�+��F�x�3�N��+A����C��E������^��3�k��a%;��n63să�����|�����Ot�� '鷼!��*W̎�ͅU�Pf��Ҳ�B�Y�ݑG��\����F����]�6����/�n�4j�t'�����d�\߄.羛���Q+�g��Ҳ��_�4V=��	��2#ˉl�F��jH��\#PY���V�=�W��zX{.[��ض�������roe�|
؁������;f[S����ZȲ��� YV|�0#�ddi^�����MzB>~��	7ly=��xhd�����/���aa��_�ࣞ0'����s�-�'G*�L,2o��Pb�zh6$ʯ��8`����_���m}�7ɔ��C��8���I��~V����J|_"}"�ŕU?z)?.�����}t4Y�Tvo9gj{��޻��[ϰ�q�t~A��=������\�������l��q�o�=�R]��BF������=>-k������%nrⒽ��*��`߈D��ϕX��G���p�g�s�q�j~��`�������~�G8���>����z�HtB��B��H�ز]h{�����0��YηG��¢�~���.	�5��a���}��X�9��4՝"���:�2��j��.x���y��BW�h��N",�^��e��Rf+��z�.��n�ҥ�����Ó�}n����Bo��4��=E��9�|vBsaQ?%4�S]�gTP���!Qle���(��(�ߎ���E+�~Ҳ�Bo�G�"!�]qJ�� ���57dkx�*���!~��}�^�M��7��M�nw0��x-߄���Ϛ-I��^xwL����^�w�~DS���ՏhI�ڵNe��.�jD��K��C=7�������z�H���    ��16�����/��_�$�G���� �F,gL>r?����M���Vki.,�0����*��.׻B�0%�ٻ�,��w�C����{��lZ�@���&σ�?}[{����ޢ1��B�����64v���2$۝�ڬ���P��e���a�b/���=�]Okآh�j���}o�6���.�I^����7h[�?������E�ɕ����T��[��ǵ������qm�:����Ǖ�3�_����z��
|3#,|3#,|3�_����͌����Lb��@=W�f
��5����QT�fv?������s�����e~X�%��O���͌����L�]�vQ����8���8�2�����|ZjBk��{�徤J���T4��P귥ɩ���/�m�����H�m{(��P)jO_,��M�,��5E��ǅW�fp�uH\x��dZr'��'m�Ck{�y��h���=�fV�o�X>��h����7�PϢ��'d]%������ �J�8HsaN	�IR�ړvM2��K:�*����
k�`�Ovq�ͱ��qҡ�\�)g��H���q�q߈<�N�llQΚ�^�����N��R.c�5�����`���;�J��l^(����q�O�����̺�\?�P!?.|�ʠ��k�h.,��lւ������/��o�lɚ�~����H(+�*���ٛ��Q��f�����g���w���&�����p�6q,k/��f��n�����84�{���>@�9!���D��t������%e��]�CL�����+>z�E������"Q�hH��t��D�b�iJ�{N�ݑ� ����7ω.�K��ݙ$�a��(�3�e��ǡK&�Ub������y�W��]v�N�r����ݯ��C�l�/D�6�a�������������Ƣ'�G�p�%i��U}WUc���y��r{k�gk|F���ʗ������WxE�������f{��Z�S��fg���l#W�]�d��Xi�X�s���T����Ń�4h;^kcu�!�z�|��/¤7|/&^�YG��:Z=7d��^���"����n����Q��;rFEXd��~�C#�T�g�zw��a�5�ؕ�
��^hd���<��	��������0���b�<�7*0�Av��VS����0!a�c*�"�]��9u�e�^XM,��S����.[*H�[��.��Y{.�V��k�]�k�zw�l�`",2��� ���ޤ�,�v�w+���ai�QC[����/�Pќ/����{ӳx�(Z �m�R޽IW����w)���^֞�Ton&�Cw�Jd>�Ԝ����zm~�������F�y'�x��F���LHD��&͓�`���Qz�������	��F�1�#���dV!�i�Cc)	��>"2[��;�{!���d><��c�#GR�F^v���f�,I}��	�,ID��'�%#?a�E�������?4r$�D�9��{K+�!�����ͧ��[S,?R�5?i7�P��H�g+�	���#E�5���f2<��Hz��4)��#u'�Q��H>i����Y~�k�q���hE8����D�V?���H��^��v�\nu�C���u�C[i������x
�_yuXX$��yT��Xh]#c@���:⇶[U�g�U���۝�D�o�#~�)�����u�����E������`Er��zľg+ݤ�L*N��ܐ�o�籬���v��֪��W��ܐ��sޅ��dm/4��1�%V�k��	���_;7:��J�Z����
�~���u�^�"�{wh��"���}泎�u�qL��r����H��qֳ���(��$o/۝6�FCsa�N����Z&ͅE� ��}��K�^�#�W+��s��B�{(>� =OX7<�@sa,C�o؅�L��!Qۿ4{ӱ]��!yN����@e�ri.l��ǟ���#�|��cs������c]r����%-�����:�nD��W�fs���`"z�W���B�~�	��L<�q�կ����˻�+C2�r&��a�Q?D=^f���m,ϙ�*��^�)������P���16�b�����C=�f�B6�x��~���+[=���//uu��}�SJsa�f�%h�k�x���б����ojm�<"���?�H�Y�����O���?�j��?.��&���+l�sWh��/Z1 :?|/�����ݜ���c��'��]+�{�x�p�K�>ʛ��5ӥw|�������}~\��uB$�����͡�{e�j&�]39��.����!Du=ԝ�{����ْX�?.������XU4���	�q�V�J���q�7VUdv������8G���q��+�b�����<t�o*ӭp�jm/t�oj�e�p�~���c'[P�졥��(K�[�����&�[��<>�[��9�7�t��"ͅ�oY��\�D�Q,�4]�ͅ�x7��l~7��(�c�Y=a����%�ү��!wI:E،7H��U��&g���+���^Ȇ����_���Ύ���n�`���/�i��_S���ֆ��n�_z%|_���`��<:lƛ� �-xþ�d��:eWؗ`�(]aSh8���CH��s!%�[^�bUbF
��꾌䎁�4��1�ё�Sȡ�!0����/v�I���+S�NL�	Q'�GM�3���G�S��/�=R��/�xkBƍ�<=R�8�H���FXd戰�j�q��~�-�fՌ��Ddv�@��F$"�3/9�H{�Qum��jF���ĲU�Q�j
���p#�j��v�Qg5C{����p����F�􋆨Z5R�Dj"_k�1�9�})Ģ���h��m�������%746c}XX�93\S�b��k��$kE�k�F��p���5�g^������跙��-j����L����L�]�$����C�Y0���a�?M�+��$>��s��q��i���&�- ��$>D��{�dk��;=,"���������ɼ��2��G�L��:��6��>{H�y���;�d&��d�e[F]���$MǏ�J�̿U�=l�����׊��n���V�=t���U�	�ې����g!��a���UG�z�h%�t�V&lQ��c�o߱�Q'62↓P��d+�������X��|?ߴ�\k�g��9�VX�#��BH���(����v�D���,xC"�E?����md3J��s���3Ӓ�(���f{�b!gq��;o�S��8KR��H*RcWo��a
��Yoz�a��­��S����S�}k��k�:�v��n���~��}k��;���b���Ű/ju��þ�.i���"�}}�e_� k__��v���״n;CXۯ����N�����m'��wK$ �w�Q�=�/����a7��^��~�K���(��j���q���=���?/�߾�	~^>��eN����M�[���]v���[����b/?.<,uį��I�����K��|��3k ��UmR��&%�9j9Q:1ČK�Ԡ.�w/�ן�Z��b}���¶2�[1�b����\؎�`����,��ؽ�|�텞���x|��%�*elD���n̛?��j�߽%�����)г�f�7vӨ�s������D�:.�1X� k�Y�Ug)�{ː���5����l
���`QM�3q�^MR��w��y5�fj��$���O�kG*���j�z�,�5�Ք��a��jJݲ"Ğ�=�ν��$��W�{ڳ����;Ky��H+�p�ü�"�����B�c�j��I��Uxo��Bw�:�$�����ɾ�lNj���mk��.W�S6�����m壅o���sn����4$�'ga�~>���-�y����o�"4���&Y��^h�t�۲��h�"oR�ֲ�z��ւ۳Va�����foI�	�&��B[fY�_ڜHK�m{?�9ԭ/��-�WFr��H"�ԟZ\�飾�X۷�Ks�U}NE\�\�ϡ�����q���6Ui/���Vך��&Z��n7��}t���)���#�fֿ�4@\�C}"}�qe\��ÿ���DJR�{N��P    ��=��x';��$���d���%�>����}�Od� rHE����NM�3?�2nߐÚw�����L�}��@�����rh�3��r9�����o�Lm {�^�������������Q�E��(L���<�9c��l[�әB�7���)0��L��3�U>�ɝ��3������\<�͜�2g��g�h�3f��B挙�9�i7sF[s��yY�E�H^��Z���Í9,�9�.�a	�!�]eVJhV�캔��|7�aq�pC�(=���j���&�6* LQ�d��$VRrP��4~wܯ�M�'���e�	~wӵ�t�B&�K6�.:H�N�K�c�b���=��x�����c`�Ʈ��2�t�,����~�##��2������u�o�.�erl��*N׆Ջj�"��&r��X��_���Ɋ�����(k�y�6w���5�k� ���e�q�1;R��c^��]��)0t��,��x�����e�1�����$��m�5ʺ��Yrf�Ј[��mu�l�:��5ʙ1��2�<���+sd`9���U$W�A�f�_���Lt�⭱����2զ9�\XxxM�rz�^hxx�R�:!�^hxx���y�J��gk/�����F}���Cg��G��C~�m��'tr[����%{L1���/�y�8dgߊ�c���B���E^�)v��;+i"?���j��O�c��.9Gvh{��u�%��7k/4��hd��˺�'2��g]�R�t*�D���F��x��87�Z�s���<a�2^�}!ze��}!z%0���C,IT� [{��{h���}�%2
x�L�'�ox��$2fl�=}��t�g��w$����Hì�^��Z�k>|b;�L��,�|j�2�@�ٗœ�cs�^M������~#��f_���%��ǅ/����5Ǐov���N�.7�lR�!m/�ٖcs3Ͷ�Y���%xƵ��aͮ�y�%��y�M9Գ�љOu�W���<}�Z؇�wC߷�5����fB=��0b,{��ފ�~-��т������7��Mhk�E��ǅߺKq2���Ui������.]*�a�d�^p����J���W�u�_�k��ǅo*y���ZԄ��J���?�M!��K%�S����m/�~уc���s��R$
{i�;*?��LӒ�'Է�b��|���.�y��WDJ��k�!�4y���â[v�	2�ܜ#K�jf����<h~���SJj��x-���S9���/|yyy�(��fY����x��<ݚx�@֍��s{E����sD���_z#O^�l;R4_O7���3���yN16K{�+$s�b7���T�?l��z�Nzƥ���Lo�ȓy���C㨲��QS�{$�p�R8[�]��m/t�{�̡����\�����䴌�;ns��ɒ���͹�2stc���cp�Sm��3㖶�|#AC4%K�K�㑠#���ș�
�)#�H�ə�Lȏ�GBT��/���><3�6�s��k}d��DXx�DX��*�������:Q���1'�< ��X�KF��cg* ����|�R����C��8��3��A7�w@7`ͮN&��m"}�����ˋ����ˋ�����;ѓ��]}�ѓC*���2T��ĸ+��J�t���{8v�EE���<b'C�`k���tL��h��!��e�V� 2T���c`Mj��Z��C�:��	kڭ[0:�zD�E����s�s�+��Z�1�:�~�
��Z�s�V��Q��i�㐪{Ih�]Kݽ!�#E|*;�6�� �(n�g��;�E%�3��#,����].����'���i~���(��(f�J����H���$�Ý:g�L�>sk����H��k�yQ�\�^|��B���J���X����Ϗ�J�����b�f��gt����\y3[�^�a���(�la+9rl�0����J�G�R�3�gO2g2)�&�ٗ�L��/�3�g_.g2)�&�n���L��'?3�g_�g6)�G�M��0)
�kR���kQ�t�.x��e�E�@`����89�qoN3W�([~��Q�彦oXӐ�kD�d�\��'�{�T]��'��9�m1+[���]5_D��e˥���\{6�.��BO�I�yƭ�����a��I�<XT�T/�BϏ���Eg���L��s�{�(�W�5�ʐܝ�V���
���Bb�j�U���o%{Ze��)�!�և9�I-�~��r�[�Y���s��r��M.\a���z�6��ďP����,t[q�z`M��tM�C,�<Kqߝd��~��ѐ#>F�*3��3��N���v���Uӭ��o�iqY��B#�<�d-[�ڿ4��y=In	�1�Î!_��a���z�:����Q;lr�7y���*G�tO���|�WZ����F�\�g==�z	;()�Tt(��l�8�o���]�U����"�R��55@�f��cC�w{��㝀|�8�|^��+"/e��$�#/S��`�=�W.��I�l<��v�P����Z��h�n՗���
G��$�y�wE���;#�q�N��=���\����ʚ ^�\�\oV�:QI��O��ĲE=��u��_�o�o��F���P%4�U���~Vg�_��r ng�m/�}Q�d��i/4곔!��ݬ����`z���x�U6�mbt�ܩ�� m/4�E�d���lsf�������0��Y�g���y�<��|{<j�����*ͅ�x�\{�����ak��G,4�t^��l{����sI�=~#��g%����G�l{�Zi|�+׻�dۛ%֫}K�^7�Yʏ �9��3�T�k�ʱ�f�י��v�Oe�^h;�,��2�[��W�$�2	�~�l}�ob9s�7T~��e��l	<YAu8Ju4�gO46cM�2�lh�\؂��Z�^��BW|�6�9kܬ�C����>"�f����vo �*�4��9�����@�w���~ZFsaQՍ�,��-�hRWb��@���Q��L먊�V�$_t_�UdbV&�ṐA���)Ysa�1�6dE��Z�Ju�\Xީ�V.�%ͅ���}����Ƹ��5xH^�9"�"�O���]K�^H�M��D�D�ώ���gG�,����>є�w���k@*�̌��"�����(r�{!�?��9��f��F$�AU|�sG����o�����w څG��G<���Јua:'.}��F|��^ͅ��Ep���y-���"m :"�"��ُ�ܾ�e5O	�:�	������ȕa��V�pN4�cep�L��Z�z�6���U����^�]��#�XՕ�*��Y����k#�o��Kf����^h��O���9~_k`eF��}d+�g��a��М�ꬢ�[}�׊�`q���|K�~�h��ő3�P�O���P�Oi.,�/a���\X�ݳ�\D�]��\?iGܲ���#�YA��n������h֓�i�e�g�iI.�q�Q��r��O�ӛ�):́"c���D�w�Q���V2 �|R����{��l�F+� ���]��I�#��;i�G�,ȣz�b'�m�H�ձ��텶s$ӛS i{�a�&������^聯gը�N��B/��X=9낶D�[����/nh��a�#zI-�u�E�9�<f�껩O��2�a����9��*(�:!Q����P�d&����^�C2���Sl�^hD�=d �a1����R}���V���k�VsT�+.����4�[�Z��Yb�n诼̞C2�d����aM.|v�T��4Nn�Q~į�9�\ۿ������kݸ���2��^b���B�'�	�?ĥ����WHy���?X@%�Iѱ�$j^m/t�!�wC�uL�;�S�r���li/��]��!G��ЈƎ�Z�bW�j�6�~���H��v����q[���f	������d�Z%�+<_�^Y��on���M��~��8�ft��l�F}�*��H#ͅEub�e<��(�[���o67��z�_�>�;�j���q��Z��B6��@����{�/��Į�b[�w������\����QN���onw|��]p��L    �i����4�@��6�Q<�*i/t�x:;�n>4��{^�nh6�12�c�lF,��]�8ZX�7�k����/�k��ء�}����[���H����^����]�k/4�QY��	*�_Vn�UX�ޅD �{��U��<j�ky���o�����A�g�W�Q�� 0���$so^h.,�R��"�A:���i_}�U�`�|���^��6���j']�:]X0��n�W�T�.��-0ގz6�J����u������BC�<�h�Fsa����}m�ݺ2+W��Mvhv�hv�^����� �$�sKbyi/4j85���Ϗ�BH%�Y��K�Uv9 rеX�։�g��X��8�@�k�4��.)C]��B��K�⹊ޤ>4����؜���6��&�r��	�_v��Gz6?�m� D�j�m�gO��yy���������а�5/�ːF�J�)�5>!i���SpT�vn���[��sp`�R��k�;K�i/4����qfv�W�4���\�$��jq�ig���0��݆��kh�Y8�+���c��l���EZGnh]i{�3���.��ͅ-X�ћ�^a�^)����q���)y��E`����V����;�0��Y�l��B����0P��������eVJ�]�,�i~�W�f�����Y�sGPQ��qDT�T���£s�z��F��F�ƱK:�^��<눦�������͍#������.y]������X��=�م��H�l��=�$5n�������!��)
-o	C��BW췁���{���4]�z�d�����_-�+=��ISe��MC�����ȩt}\��7��aZ��a5J�4%�ɮ�?.��Cc�����H��^hX�c#G��6�lv�]x�zFɩ����I[��D�B�hψa�􌜙��;��!zbpֹq�������J�3U�ۯ4����K�f��KW�m6ei*g������a5���Y�҂�co��}���~\xĿŞvbo��r��Z{�M�c����Ю��d-ͅ�>�`;m����/�Q�������C�����r%D������i�Z��U�K�ǅ��J��INU����wՑ?G�ǅ��zZ۷�9�ruk/������ɑ����ۻ$ C�񁵽+Գ�]��m�
�l{W��8��Eo��b���azuќk{�q��R|O4��Ė��Y���w]Aܷ�+~�=�$����A?.<ۓ�?/��\�ǅ��9����ɸ��z%��3���!"peԹ����L̉��"�����<��"-���B#�'�32t�^s ���2�K���KVAv��,���^1�2xD�����M4JW}�*�>u�y�*�v�&_q��.�-ͅ���ج�<�=��a���4Y�`�nn�U�� �¿��1��՝,��<�"#�ߚ�+���[}Յ7���Ӌ�q�L�)F(i��O���l�R�)��rC�+��n�2��hۙy$c�?.�Ċ��`K8ܾ��Iݶ�]��Yw���QC�^�|?q�m�L�{���m����[�Y2G~�ߛ<�|�#_T�1y�ٍ��hyqH���n���پ�gRRDi��B����nθ��f�OB�$i�5+����Q"��D�~K���L�:�e�� w?c��^hd�gz,V)i{uŉ$0���A�G�2BtS�=����*/m/��i���O}Ã��)���^��?��m|ۿ�Bm�М,�!YJD����Kd5���^膾9/��5�]���.���+/�������<K���S�k��~�y�o����H���7He
����c]���>.gc���<fF�O��+���z+V���-�g���]ͅ��������m+���^;㔽����5<
^�����F��X���F�ޓ�`�e)��i\#��+s6�{�Hȝ6�{���#]e��,�"9"��4쯌�p�G ���^������wU�����h!������K��L�}˽:gk/�F�7>{�f��	yކ�?�e�ؼ��wad/��θ!EN��!����jI�Ċ۔{
�Z�A��g/c3���R�{�T�����*rVt�^��I��T���j��/O~/��n�h�8�GzF�X�[5z�3n�3��?�)�����\2]r<����"�]w+��{7��j�^V�1����fx�,WG�;Ë{�������^��@�Q��|��\�N��MXu���v���z|��@t7+�v�t�b-�(����9s��	\��lnV�e9##��Ce?��o{��SU��^hx�M�w^p�^h{\�抇�<M���7�i'��̂D�Rz:if������`QX����!�F����g7Ҳ���^����zߐ%K�^Hx4�Z�������q�H=x�<�4����ߟ�@�C�Z�Hhr��Ʈ$K���ߥ�1������Ff�g��b��"�Ah4�H�ur@[l&�rr�|an�����"�������o)K�?g��G���=cֿdջݟ�і�9���bNc�u��t�uJ���ՑE-�]��Dտd�]��]���5�����,��q��O=�'_�Of1ߔ?���|��c���/͐������'��a7Ȥ�3�:�鶜����>�tږ�Z���4���M;u��|�>Ңҍ5	I�n�棅�Y��c��${��mO�6�E�9�i��G(���b9��M��d���З����c�= Hw�;�EO���-��E����d�=�"��=�_-?�m:н2E��m�S$XFݳ#�aU�� V�A?�3���S��2�=�Jͽ&5�`3��>�yN�L�.8�����*��/H����k~;�f���=<>��ܔ�;nЏ�Y���om�Xn6#�4���eg�{Y���ULֺ����~M}����m��B������`�# �Ǩ�B���̏~t3s�B**sOH8�q�~�$���tܠQ6�����<$ �����U[���r�=x���t/�u�/�W���kf�Kt2_�ժ�yK�V��1P��l}C�JA}�����a�<Q2b��D6�R�b�k5��Љi����[���w���UQ�w͈[��C�*JA��A���m��^G��6�l�"�=Bᰇ�r�~i~�\����tܠ����Xm��J�6�����Y�|�b��W3��<\�l~������m�Mb�9Bb�A[vZCdg�2��mL"��M�i7i�l�WH�_���^)��L=T����M������*#�V����HZh���Ȭ+�q�6F������m�����\��b�73[u���V�Xv,k��7�Z��f^�y���b�p������a�7}��l^����,��t�6X��=�:b�� ݵG���Xh�t+쵮�m� ws[� �=%T6x�!~�jԸ��o�R����m5 wk7?rW�>|׼e��aX�l�$�/6l�Qs�����wL
i��uY�n��d�k�����-�ׇsaṨwX�0����=l�E4��Æ7vZ��"L�3�AG�G����q����;�pZ�`IQ���[l�y]T�zܬ���[�v]H�6p3�1�z����?k�.{�5]�{rjL�Ӈ޴u��Y�:��m�0;ۑ�m7҅5n�:ܨm�=J���h���U�`���q���c�*���D�A tY�H���';)�=$j��o��VS�H�ʃ�E�h1ϻ����� 77��a�Ux�w�◈yy���߹�n<Ѭ+��mA;�0�7Z'��7��7俑�,�~7�u^�C[�;�U�HaVU:���SXh��Q��!Ǯ&ja��سgm��&���m��>�����>��a����x�.殬<��5��K޺j�z���??��<��]��;��}�Z��[�y��`>�-�]��󛄡A�A�>$�KDv��:�3	����xߧ�+p��_!1�p}+ ��.M��Ȭ98�§�jQ�d���c�K�WG�:oa�NE�B���4*�=�OG���d73����yE�.V��$���b��.���d_��_ȡ�A�ykf��o4cT�hg��k�+��9`��7�jc�H�����DQ�=    ��ƾ!��K�����k6���,aܒ=7',��T�2����G�r`�o�.�uT�l��]LZ�o����t��}��d\��Q9�����$6����FC�c�{�-�)��Z�ڢ�>�96�S��uSA�Ö���R����j�T�9n��L��/Jh��I��y��n�m�q��K0�g��;����3���a"T�{K��=pܠ'�7�ڔaߓ�$hY��	��|��W�~=�L>;�ya�E�#C���6�#��;v�j��里򵴟��aҩ�q����"�P8���n�:{��r���ɣ%:{�1H�ֻ�3-�h�����s��(�͛c�*��Y]H���1�	�U����~�%'�nA6�8�ƶwd�G�Mb��(����n�����ǅ_n�	����_K�GJ����jF&�����v>쐎sܼ���x�_�LM������V�C6�n;�c�ȑ^k�V��XXyc�=H���n2-K&?�N���Hԅv.�y����l�4	�u|����n�� ѷ��M$D�!y%�`�A�[�k-=��T_+��䬚G��<Ryd��y$�-]����&'ĤdUOf'�pk���h����u�4[�;ϕlm�u�-3�~�ihnN��\MS5��cg������ΎҲ{P'{��9�ݪ�1h������r��a{2g�&��r�����L��������� ~��g����7����	�*f�������M\��:����޳s�3��P���gf�[T����j�����׸�4t�@�y��}����*|�?�B������U��e}?��;�ZI&5[pלMV5W�,Ьd�5G_+ȫ�5#79��S��Y|�U��/���&��S-l�NՑs>`�qxcمk�|7d��@씚���o4��������Q��h�kކ�ySs5�pw2�����W�&��%���5�'�y�\���|�x�3W;�y��,}�t���֡�9o��ƾיx��y
һ��͎N"��k��K�آݵE�yIl���
�1��=�#v��j][�Y��~�a�كF����-���;��|ڲ�ܘvn�m�{����Bۭ۳���-��k֍�dvs�%X�n��"�bfda��kX��v��tcEY� ���� ��'����K�B��}kv�٨�bO�lΐ�����{�L�c����7��|4w�^�B��.J�3��)����hc��o,������ܱ3K&���}�ՙ��
�
�̆4MlWͪ_���zr����V �V�7�B�UѲ��kzE�/wT�x.����V%�K"��FM^$y/�����{�u��Ě����K)����L�G�IÕ\dBĊ�(Z~*tn�WA�-|]݆7>�ו����%W"��`�g-yt��ƅ��n�;��QÕ���?\-.��2D/� J27h��
�yi��X�����o�jU�����"�/��L=��{��&h�����6�nl�5����7�d�ğcF��ڡ� ���yj����o�|��7����$������[x�^4�ч�����'>-�N�#��e�Mx�ć2.�a2G�������~��{#�H����J6��c��#� r?�gܠ�z���%���U�?��K�;=�zv�� �����缟�Lˣ���2��3�{��2��϶xae����[\�U�Y�Ϊ����s���6k��G�L��z/��|�ۊݔ@7کmg��XTrX�= BFi�cQ��}��T'��l����z���G)�����⡹��:ȩ9)B��EJF�0"��x�K�ϭ�\���� h/$'�٧����Y�E.HΚ���R,�4QH�l7heJ:K��|��7|���<D���FO�рv��T��3�:r`�������%j�5�Tѻ>��P
�Hy���
dt"�&+�Ӊ|,� �/wka�����e*{�Y(��� 
��-��CW�ܻ����Z�;��]�ߖ"���ՠ'j$�'��3nЖ!�c�TܩCgvV�"��.*nɩؓ-P-�w���\V�G�ȧ�����ު�g>�ײ=�t�������J��I��F�G����e�8�uV�n����ڝ����..�-قև}<y�K����1�"���&�DK`���Ւ2 ��on�fQL�ݕ�l;zx����Kna^na+��{��웎�����-��-,����Jp�z�����"��������nò��Jd�C?�+�P�CMҕn�L��f^v�y����>{r�ݺ���v�If/�]�5��[+Pد�����CveaG�t��v΁)�&T"=�� D���<��;~7��N"���=��Y���W�.��RQ���Lʞ�������Mʟ-��?KO���q�z+ڻFV���ӭP��j�e����a��<ҋ��ڍ5��Xm+�t�Q=�S.�MiI:�</氘*����[���;`�ag������[�Q�X,�^����_�ؒX����ߗ��p1����@�h/"U�9A�#: �#Ree��l;��_ί��:��~M�}�c&"�rʅ�#n7��K�gVN;6�9"U���5���2�*�,%�%*�R�|�b��B���b�W�M��E��`���i�d`�~k�}�Z8����.��ɋ쇳UY%,�+v%/+����k	W��kD�\�u�5��5'��}�$&���2۶*U#֙�h��ί��a>��J� �v:�mkt�����T����Up�XG�T���]���n�B��u_��
�;Q�gtҥ�[Ze7A��7�-Ue^?s��nm�}*��I�%M�Tt|��2@]�i/H��,�#�h�`�]�,�X���#�<+ވ�w��:qwGy�`\zF|�ZyB���]{-)�L +_��˴��/�T�g�c�q$��a��������x�yw�؍�6�geX����s��Si�s��Y�uUk�2��5�`�sgy�2\ �m��г��|���ߴ+�SY+枵��f���k�P)Q�Ӵ�P�����'w �7:�68����E�hNj��gV��=��˜��طzb՞̂���o)��+��5���4�_����U��q�������tr��C�̯���F����k��u�>��Ѣu�3N�����aAYI��7���c���#��ݳ�~�J�ÿS��7��fԉ{θ�Nl��-�#���-�s;L���5�u�Q�DO��O�@e��H���Dh[�ʌ����_�g/���6���.�)����xdo�LtTb�g����$�qݱ�=�m�&{�~�3l�Cu��y�j���.�-��:�QR{���u.ņ7�[<Uqv����nU\e%�H�z�R�4{�z\ 5�PnM\e5�؎���)jv"�gi�Z�z���~[�,G��z���|olѬ���J�~[E���8��`y6���i&�e��R���=��/k�Z�6��_�n~�Ү�GA�b"1��7rZ�eN�|�@���#�B�%��p����L���a���wt�lK���O�x��";#o���ܯ=�_�ïz����xˊ�x��c�{z�������f{������)���� ���C�X��B��Ǔ�����D�����t���n5��mQ�o�E���>ۅE$YȮ͵]r�h~s,�̇�ޤsBu��N�#Լ�\Ͷ�n���Zr#B��X�]C5�9S3��
��:�%U~_qcBm>��y~k��Ӽ<�Z�֓T;��$k9��X��X�>��Ւ�]/o`��t4��^P�yO~1��c��1m����_������J�"�4/��f�X�#��=k���Z��Ի��k���m!X�J��}~J�}x������7h�x���уG��x�Ù%��ˁ܈�?�߈�
�5�on������#G�܈��1�ö*������O��~�b��d��N�`�,�\�/���^�.�{��`x@Z)�7�&�"������Z��l�����#%Ίx%*��xe-����\F�۰����L��a�A�+vd��|jL���'IbR&�᲼T��=Ћ���)튥5��ŭ��!���ż�2K{�t�"l�:k�Z �  9�3��:��q\T�.����֙5�tQu�Ȱ+����됂E����=f�[�^�OW�oXt�{�;cv�A�j���=l��.���3/}x�����)8��acQ��n��k���E��u�n��.W����`W�A]�{|K�lL0;��������G�#bc�=��!iC���fNh4�� ��ȼ>��۲Er���P,����r+����U��BX���5˙�^��LFw�G�z���6k��'����G27�զ�ܹ�zx��ל-��/{�vc
�h��K
*!r�H���t��$��(qܞ&��4�V,��ؤ�"�����vYL��2���iCN��/̢�h�*��@3����Fz���q�6i�\zW�������,���0��_nu)ґJ��Y>?]��u�''��	�wS[��:C4�$ӷ�`�"��vQ�F�1�;+������P+O?M���9��.����1�}�}���?%Y�4�Y�u*K�]m��@௏�cxcKѮf9x�d#�'c���AZ��45⾣o1��q�{�eN&2��3�nw��F�ˈ���ۡ}rܠ�[av����L����"�>��ڒHUda/��}��q��edVr|���7g����/q����k4��-	$��]4��ot6�	N����;�+J����:�4e��ͨ�6��ͺ�"����S�U�{��z�I���̢�;/S�Ӻ�7������u$����;�6Z�.�{a5OX��ъujqy�[��e�۬Og�jyֺ��	[,��s ��h=Q鴭���F�.
4iq�I�F(��l�#��7�V��dYw>z�q|��B	�D[��ֳ��C���j�q�>�ב�&e�m��u��p;��hE���֨<�����S�ů�>kP7o���G�[�g����7�BN�Mw�^�ɤ�d�rE�a�e�s$2�se�c{x���[Ek�����j����M�&>}�� �蓂o�ɵ/�s� nШk� 4�K;��K{F�f�6���t|�Ϥ7�n��zEojo,Y1�g��(vb�_!>�����s��f��*������I�-6l�fT��Kc�h��՗G7;N�񈰍F��@��Cp��w��X�9"�2�8-�L�]�����I۰?s��=^#O:D���{7�s�#�$���\$�Y�@�3���E�zh�w����r �d�rJ��͈�g6�6�M�:C���q����	e�|�F&���Գ�(삡4^���!��-������O^
�.�fbXL�z�d�[�fS��M=�j���A�8��F?�[��]�r��ߡ���^��n�g��yD�r�����ݦ���Bo�*��>l�f	\u����ޮԠ�V�=f�D{�B�;�v��U��n��?�v�,�C%$Ƿ��CV���u���[G��b��f�^�Ø�\��޲�?����`na���^(�����d�	#��qڞ��o�%��_O���4��L�O�����"�vP������;;yy��O�z9��J�tF7��06�����_�x��:�ew�:#g��п�����f	���;���`��fm���{q�&���M 홡��*�,D�C�g�ƒ.X�7�N>M��b�d�r��U���\�Y��q w��[��.oX4�e ���Z�^�/d��a��9fYv�D%l���r�r��cl���]�q��ܷWu,1Z4��SOѴѬ��M��ϐ�殳���^o�OO���+Gf-�r�q����j�O<��t��i��q�M^[|2W���ƾ9��!�3�}�ٴ�̓]�O�yrd?焎�6>;��ǋӺ�OS[���^�l����K��O���-5r09�3u=ً��;9�m�S��-;v����rZ1X������ &�+n�����b��7X嶾�ZeV|��m�o���n$8ĿؔM}��Scֿd7���ߵ�ś3�i�F����|	y�sT4'{�h��'Ǣ�~�����?���δΒ      '      x��[ۮ��r}�|Ec���&�n6o�@Q�gS�BR[��<83Nf�`��L 'o���\�$��B5Eilc��[����uY���fA�(������A(C�/ٺ=���պ�Y^t�*�=��.��c�8�Y��u�<�jO�n�Y�3<�B��*�I�b_,��� X���,H�- H��>㭲c�r���'�ت΋g�g�*���|�O^�8�!9L�k�<pDs�D��|b<��Ox��=F��J�"�I�"�%]˵��W�dQX���K?�[�)���A-����'<||�U[ueN����i�*����A0[����H�bQ��q��^Ns�ۆ��1'���c��R|N���׽�������%��"w�������j(ó�Qf$f��#�ݶ�3��|xaE�զ*�J��>[;ɹ�ȕ�ޑ���*����]Նbܴ����e_���;�V��I��_D�h.4q�F\o.�Ș�01�*ڪfo"f��&
8�X�T|cUQ�����~"�����H�Qz��S��.��7�	V���+���1t[��3��Pl�(�����H�4��Hg���""�����\D�xa:."H��f\�!�EH1.���T~u��xm���� �:N<�0rE��\;Vo�Ƴ��N,G�3ɡ�3ѱ+:E/f���e	��N�j��4B�Oc��{#�崸�A�2b�߿g��d�XP��b��XXm4��=�-�q��D��1�� ��s��Yz�F���D~�;����f�zEޭ�|����Gv\�c��u����
1���/�`�X�} �$�������FZ���O�i��N�GЗuN)�b֦�(,�I���Y�i�+pǮB���pv[Bzq���<?�~ߑ)����ئ��W�HR��E��sp�ؗE۬{��4���	i��A,H�pXV�]���4(u���k`/$J��٣'�e3e��N܌�m}*L�>coG.!�&©]x�Z9�	���|�y"��,�$p���KG����%l�(?.1M�0�KY�3j��nM��<���܁�Gz�+,�� L�N�MͳlF� F�	�6�m�hiO���A8u�xt$e}%}�BNS��&k�,��8�����X���]^;�L�8��=r�U.6� ��<��8�[���$M.C����8'���ȉ��I�6�lW���=�$e0C,�]�/،������d�t��L3c�dJ���k���B�SH�)i�"or�:�>v��O	��$4����T{Ztޜ����I�#j'��N�HB�U��~�_ȉl]6����¡��s�h5m�1�҂�̇�'��������}WR�-�l���9�ҥ��H����p8>Ϣ��~!�pmҨE�|����Hx��֚v���H�IŬ��Ͻ
�p���1�A��U6��lO�@o/�̭�&X����̹Ǘ"i?`�M?n ���+�0��r̺]��;��fO]~�J��M..4����Iwl�rMek�<�X�E�ϧ	B״b�������!�n2u6���e���m�c��E�l_L�ƥ"���̅�hv� �VhI"��[:0�/�C�T�~��F��r�	c�K��,6-�G�~v%T8:3���C0,L��]�$�5��G���uy,����&a���N���i�� E#6�[j�����ڡ�����_�O��j�9���#��g6��VI��s���}|��G/��#[澼�[8s�\���
�E
%R���Je�����0�y~OeK'�|{�t ��'��kv���1u_tՎ��=n��R?�
��p�����n�4�����w����_�ϟ~�l�T\�2q`Y�?9�EcJW`jm0�Vq��"3GhP5�����D��LПYe�--P5�������2[��͚��u��o��iOw��H8aH�Y��U}_?�{Y^^�����'�*g'�-*��:�]��a�$F��0�sW�`��v2	~H-%���	[�~�����8�2
(H^*f�Ml���M������\�5V|A|p~=.�mm���g%�\x�o"�X��/t���瀯`*�0��qbq	�ZP��ue]R5�����m�3���K;��A=ܾ��lc[��S,�y�o����,�P�<3�Ď~U·&i��T�P�b�l����Ԕ'�cf|[�^ޱ�p+����[BzYB��O�����-��kbE�U��@��YՀ��j�*bo�TI��n�5-���a[���g���˫����������#D���;5鸠�����L����T�ٿ|�7��	����_ٗ��?���/|$����ߗx����/�	���}��?�l��|�����ǋ,Vc0���^_?�;�G��Q`L0���w����$�uBv P�����:�!�vԼQ�B�V���;S��m�H���!o�9�̇j�/;��z�nQ���9"��ع>8������� ��� ��E!�3�X��hĝl=�f ͻ����o+�s*�F��S-[�Y\K�0����p��G��E������r��\������(#�ݮ=t�n�ZZ	��d��S�A������!��	E���9����KF�s��/N@Z͋���v*����:��h0����%$��ca��+@���Ԋ�fۛ����ˆɠb�g�|5!�Q064�����Tf��a_z�*���� #,{SR�Xo{lX�l�Ծ��|h¬ME��-!�̈�|���ꧦ%>�2=�*1��0f]�x�O�H�7�ҧ͠�;ͤd҆�Ɲ���@'e#�/��e��"�c�j��� �9B�b�xɋR"�����AE�g���cG.$�ym���?���R�����r����t?�!OLB�wã�m)p -�=;f����x`F�m;ݔ%�F4�2_g&[��)E�Q:����
T����g��Z��ԘCæyҟ�jv*b�]~�Go઄�z�zE����Pl0P&H}A� ?/�����V=��X����.[,	ix�H����&�j��)Oy7�!D��:�6@꽗m/�w��"",��U 1�i�
7V#���u���.��a���	�F�����9�0^:o�:�����1�i����Gl�~�ܢ�w���� ն��&�V��ۄ��d��}h<L�K1�e~6��&����i��-�SLQ �6f���T��%CJ�|�p��T�r!Ӈ��?���kĥ��#��m_�U����I���c���ö�+W���r��}:�F ��?�	i�I�LPf�|>;)�庂�0X���8թ+�YZ�4T�@���������7T+�;]�s�y����bmA�����t�54��>�x0�=ۏ=sLL��,*��K��[��=����Ҧ�u��%��b ������qV.�}���_�Ԉ��%�Մ�vU���2�ӵ���dD�Y�,�_QPWH���ѫěo�SEh=,��O]I�x��C��L���s[:3�T��J�$	���� k�U}~�/��w�V6(ڦ��S��@�ӻ���-9��}Ӷ�a�����ȍا�_�S��w6A����h��r��GmI�Z�g8�GI�[q\9��TxxA��&r���(1W2�G�0[w�@`�J����l��������x/N�ø�`��o��-�Û�0+�o�X���E��ɐ�t�N�ф�*oo<3��'Q�H�6�o6���/�re@���>�Ъ�58O*�f�2�Cg1���b�9_�,E�BVٴ0�z��.��=����^��j�\E��ո�8����� $�x�D��T�"�śP�+��~�{1qt�\}��0)m��w��+�p�9ݍq��xY�n���tC��:���W凼W���,(c����^�{��
�e7���&+���OY�$L��,�\E^�u8�JmX�ąG�IH�1,�7�y}�U -&���Q��2^�w�֩�53�:�9a�I���/���zu��:������v�mjGmuM�8�t���7���O����u��z+��J灯��4z����j�X�P��i���jy��	��;�n Y�;�ӽ������"��� a  ,,{�D�/&
�d�\�w?e����?�L�n!<t���e��@N�O�z��_Z�H�P�C��)��=.�Q���7T���IS���\�������Pi���6���:��'n�G�lI�.gm�j��j��K��ԥ�zO��+@��`�*��s�X�H�Tgh��t,\�F;�V��������+_������&�x�lfD{�L{Q���M/B��6��wr�0���xd=�4(�-:���p9r9.��W�̋h{*�<E��;E>�TG.*}���\���3tcV����*��>����C�b�Є#�I~��?���@m��������&�e�>�RkA�3�88�״@�78`��76�H�S?�Bk�5���hm�\��O���j�����rꤡ���O���R�р���܅��Jp��B�3/���B�#���ΐ:"�^�.��?��u�-�]��_�w=��k��?�=[ju��E���~�:W6lEw�ٮ�JF^@��S��g��eǂ_C���.�%%7� ���N��t�9?�}�\��Om���ڕ��)~�P��Z5�ζ�H��������0�� |������$����m��5�P-�5��<8	�m}L��W�yg�2�g�%x��\�^��[�m��O���� �K<�x'3n�φ����*���|�*KO��ʹTf��+�'Jƺ��Y��[�?������ÄhDsZ��!�!%tH1�tD!��P&�~%\�J��o�GR���x����f�o�%�8�ꀧ�6-HR[��{�K��oxU�0�$������J7�g��9���o����U��s4��0u|R��~ 5@h�x��lf�X���Y�g��D
7w�ߟ���U���j"�ީ�������q D      *      x������ � �      ,   P   x�3�ttt�700�Ҝ)���)����
9�����)Y@NbA~qfJ��H	q��.cδ��b��4 ����� ^�B      .   �  x�UR�n�0=�_���"��49��X7`���Z�+��\IڿYr�H>>�G��}Hy�C��zsN1`��K�c�����65t>�{Ʉ�M�y�x��D-���墠��c�����}.�5tn�����H>�7�{Kخ��Jl�e���m�kt�0��'o{I��r�W��>[O����x�G�{���~G�v�t�)x��( ��}�=Mµ �B����K��5�9��G3�߄�����T�b��}����EW~����'���Z� }�^�hT���*���E����J�'�j+���F���)�c�	u}K�q�m�l�uSD�X�E�na?N*������u�h���"~d�kx\�'�M�D�|�� �Qo�'i
�5��w�z�cϰ�§<�v�k\v��	�4H�      0   )   x�32�LI,N�22�LK)N+�2�(�O)M.1����� ���      3   �  x�m�M��0��u�.O�-��AE*B��T����GQ��s��L2y�tw�͍u`�5�� ��~o7Q<���N�I_&&�a��<�7��ẫW7�cV��h?ns�_��9�|P��8��hΛ�ɝtU�����&V�o�(/���r�ZH<p���y����i�cPPdp�IN_v)9�q����.���μ�=�A�)��Ⲉ��;i�Z���$���s_���]'��/��ʤ&C����~����0d�%TS���`�'��F�[���� =4I�I�|��2���f�z��\��aQ9����%-��ڰ3�K'�G�1Z�п���� ʊ�m�V��u��=�3L���:��D�kk���%N������E ����X�+
��	DN�"      5      x������ � �     