# PROBAST Tool (Prediction model Risk Of Bias ASsessment Tool)

## Overview
PROBAST is a tool designed to assess the risk of bias and applicability of diagnostic and prognostic prediction model studies. It provides a structured approach to evaluate prediction models in terms of their methodological quality and relevance to the review question.

## Four Key Domains

### 1. Participants
- **Risk of Bias Assessment**:
  - Were appropriate data sources used?
  - Were all inclusions and exclusions of participants appropriate?
  - Were participants enrolled at a similar state of health or disease?
- **Applicability Concerns**:
  - Are there concerns that the included participants do not match the review question?

### 2. Predictors
- **Risk of Bias Assessment**:
  - Were predictors defined and assessed in a similar way for all participants?
  - Were predictor assessments made without knowledge of outcome data?
  - Are all predictors available at the time the model is intended to be used?
- **Applicability Concerns**:
  - Are there concerns that the definition, assessment, or timing of predictors do not match the review question?

### 3. Outcome
- **Risk of Bias Assessment**:
  - Was the outcome determined appropriately?
  - Was the outcome defined and determined in a similar way for all participants?
  - Was the outcome determined without knowledge of predictor information?
  - Was the time interval between predictor assessment and outcome determination appropriate?
- **Applicability Concerns**:
  - Are there concerns that the outcome, its definition, timing, or determination do not match the review question?

### 4. Analysis
- **Risk of Bias Assessment**:
  - Were there a reasonable number of participants with the outcome?
  - Were continuous and categorical predictors handled appropriately?
  - Were all enrolled participants included in the analysis?
  - Were participants with missing data handled appropriately?
  - Was selection of predictors based on univariable analysis avoided?
  - Were complexities in the data (e.g., censoring, competing risks, sampling of controls) accounted for appropriately?
  - Were relevant model performance measures evaluated appropriately?
  - Were model overfitting and optimism in model performance accounted for?
  - Do predictors and their assigned weights in the final model correspond to the results from multivariable analysis?
- **Note**: This domain does not include applicability concerns assessment.

## Signaling Questions
Each domain contains specific signaling questions that guide assessors in determining the risk of bias and applicability concerns. These questions require "Yes," "Probably Yes," "Probably No," "No," or "No Information" responses.

## Judgment Process
For each domain, the risk of bias is judged as:
- **Low Risk**: All signaling questions answered "Yes" or "Probably Yes"
- **High Risk**: Any signaling question answered "No" or "Probably No"
- **Unclear Risk**: Insufficient information to permit judgment

For applicability concerns (first three domains only), the judgment is:
- **Low Concern**: The study matches the review question
- **High Concern**: The study differs from the review question
- **Unclear Concern**: Insufficient information to make judgment

## Overall Judgment
The overall judgment for risk of bias is:
- **Low Risk**: Low risk of bias in all domains
- **High Risk**: High risk of bias in at least one domain
- **Unclear Risk**: Unclear risk of bias in at least one domain and no domains with high risk

The overall judgment for applicability is:
- **Low Concern**: Low concern for applicability in all domains
- **High Concern**: High concern for applicability in at least one domain
- **Unclear Concern**: Unclear concern for applicability in at least one domain and no domains with high concern

## Application Process
1. Specify the review question in terms of intended use of the model, participants, predictors, and outcome
2. Assess risk of bias and applicability for each domain
3. Reach an overall judgment about risk of bias and applicability

## Implementation
The assessment is typically conducted by two independent reviewers, with disagreements resolved through discussion or by a third reviewer. Results can be presented in tabular or graphical format.
