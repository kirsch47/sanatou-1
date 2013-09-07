Install
============

Neo4J
-----
- EC2 Start Ubuntu 13.04 64 bit on M1.medium
- Alter Uncomment IP neo4j-server.properties
- Install Oracle Java // http://nikolas.demiridis.gr/post/51149977942/neo4j-install-on-ubuntu-lazy-admin-way
- http://54.221.197.106:7474

Nodejs
------
- Beanstalk Nodejs
- Elastic IP http://54.221.198.20
- Source epha/sanatou

GENERATE EDGES
-------
SELECT 
    rel.RUI as Id,
    rel.CUI1 as Source,
    rel.RELA as Label, 
    rel.CUI2 as Target
FROM 
    umls.mrrel as rel
WHERE 
(
    rel.RELA = "may_be_treated_by" OR
    rel.RELA = "may_treat" OR
    rel.RELA = "contraindicated_with_disease" OR
    rel.RELA = "disease_with_contraindication" OR
    rel.RELA = "drug_contraindicated_for" OR
    rel.RELA = "has_contraindicated_drug" OR
    rel.RELA = "has_location" OR
    rel.RELA = "physiologic_effect_of" OR
    rel.RELA = "disease_has_associated_anatomic_site" OR
    rel.RELA = "is_associated_anatomic_site_of" OR
    rel.RELA = "sign_or_symptom_of" OR
    rel.RELA = "disease_has_finding" OR
    rel.RELA = "is_finding_of_disease" OR
    rel.RELA = "disease_has_primary_anatomic_site" OR
    rel.RELA = "is_primary_anatomic_site_of_disease" OR
    rel.RELA = "has_indirect_procedure_site" OR
    rel.RELA = "indirect_procedure_site_of" OR
    rel.RELA = "has_mechanism_of_action" OR
    rel.RELA = "mechanism_of_action_of" OR
    rel.RELA = "disease_has_normal_tissue_origin" OR
    rel.RELA = "is_normal_tissue_origin_of_disease" OR
    rel.RELA = "has_pathological_process" OR
    rel.RELA = "pathological_process_of" OR
    rel.RELA = "disease_may_have_finding" OR
    rel.RELA = "may_be_finding_of_disease" OR
    rel.RELA = "disease_excludes_finding" OR
    rel.RELA = "is_not_finding_of_disease" OR
    rel.RELA = "may_be_prevented_by" OR
    rel.RELA = "may_prevent" OR
    rel.RELA = "gene_product_is_element_in_pathway" OR
    rel.RELA = "has_gene_product_element" OR
    rel.RELA = "gene_is_element_in_pathway" OR
    rel.RELA = "cause_of" OR
    rel.RELA = "due_to" OR
    rel.RELA = "occurs_after" OR
    rel.RELA = "occurs_before" OR
    rel.RELA = "disease_is_stage" OR
    rel.RELA = "is_stage_of_disease" OR
    rel.RELA = "chemical_or_drug_has_physiologic_effect" OR
    rel.RELA = "is_physiologic_effect_of_chemical_or_drug" OR
    rel.RELA = "may_be_diagnosed_by" OR
    rel.RELA = "may_diagnose" OR
    rel.RELA = "may_be_diagnosed_by" OR
    rel.RELA = "induced_by" OR
    rel.RELA = "induces" OR
    rel.RELA = "results_in" OR
    rel.RELA = "diagnosed_by" OR
    rel.RELA = "diagnoses" OR
    rel.RELA = "treated_by"
)
;

GENERATE SOURCE AND TARGET NODES AND MERGE WITH TALEND ( ADD PROPERTIES )
SELECT 
    distinct rel.CUI1 as Id,
    (SELECT Lower(STR) FROM umls.mrconso WHERE CUI = rel.CUI1 LIMIT 1) as Label
FROM 
    umls.mrrel as rel
WHERE 
(
    rel.RELA = "may_be_treated_by" OR
    rel.RELA = "may_treat" OR
    rel.RELA = "contraindicated_with_disease" OR
    rel.RELA = "disease_with_contraindication" OR
    rel.RELA = "drug_contraindicated_for" OR
    rel.RELA = "has_contraindicated_drug" OR
    rel.RELA = "has_location" OR
    rel.RELA = "physiologic_effect_of" OR
    rel.RELA = "disease_has_associated_anatomic_site" OR
    rel.RELA = "is_associated_anatomic_site_of" OR
    rel.RELA = "sign_or_symptom_of" OR
    rel.RELA = "disease_has_finding" OR
    rel.RELA = "is_finding_of_disease" OR
    rel.RELA = "disease_has_primary_anatomic_site" OR
    rel.RELA = "is_primary_anatomic_site_of_disease" OR
    rel.RELA = "has_indirect_procedure_site" OR
    rel.RELA = "indirect_procedure_site_of" OR
    rel.RELA = "has_mechanism_of_action" OR
    rel.RELA = "mechanism_of_action_of" OR
    rel.RELA = "disease_has_normal_tissue_origin" OR
    rel.RELA = "is_normal_tissue_origin_of_disease" OR
    rel.RELA = "has_pathological_process" OR
    rel.RELA = "pathological_process_of" OR
    rel.RELA = "disease_may_have_finding" OR
    rel.RELA = "may_be_finding_of_disease" OR
    rel.RELA = "disease_excludes_finding" OR
    rel.RELA = "is_not_finding_of_disease" OR
    rel.RELA = "may_be_prevented_by" OR
    rel.RELA = "may_prevent" OR
    rel.RELA = "gene_product_is_element_in_pathway" OR
    rel.RELA = "has_gene_product_element" OR
    rel.RELA = "gene_is_element_in_pathway" OR
    rel.RELA = "cause_of" OR
    rel.RELA = "due_to" OR
    rel.RELA = "occurs_after" OR
    rel.RELA = "occurs_before" OR
    rel.RELA = "disease_is_stage" OR
    rel.RELA = "is_stage_of_disease" OR
    rel.RELA = "chemical_or_drug_has_physiologic_effect" OR
    rel.RELA = "is_physiologic_effect_of_chemical_or_drug" OR
    rel.RELA = "may_be_diagnosed_by" OR
    rel.RELA = "may_diagnose" OR
    rel.RELA = "may_be_diagnosed_by" OR
    rel.RELA = "induced_by" OR
    rel.RELA = "induces" OR
    rel.RELA = "results_in" OR
    rel.RELA = "diagnosed_by" OR
    rel.RELA = "diagnoses" OR
    rel.RELA = "treated_by"
)
;
