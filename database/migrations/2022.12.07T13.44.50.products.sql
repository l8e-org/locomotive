CREATE TABLE "products" (
"id" character varying NOT NULL,
"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
"name" character varying NOT NULL,
"category" character varying,
"variant" character varying,
"description" character varying,
"image" character varying,
"keywords" character varying,
"notes" character varying,
"IPN" character varying,
"link" character varying,
"isSalable" boolean NOT NULL,
"isAssemblable" boolean NOT NULL,
"isComponent" boolean NOT NULL,
"isTrackable" boolean NOT NULL,
"isActive" boolean NOT NULL,
"isVirtual" boolean NOT NULL,
"revision" character varying,
"responsible" character varying,
"defaultLocation" character varying,
"defaultSupplier" character varying,
"isPurchaseable" boolean NOT NULL,
"units" character varying NOT NULL,
CONSTRAINT "PK_3d8016e1cb584ede4f190b86446" PRIMARY KEY ("id")
)
