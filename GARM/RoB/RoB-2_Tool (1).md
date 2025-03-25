# Risk of Bias 2 (RoB 2) Tool

## Overview
The Risk of Bias 2 (RoB 2) tool is the revised version of the Cochrane Collaboration's tool for assessing risk of bias in randomized controlled trials (RCTs). Published in 2019, it provides a structured approach to evaluate the internal validity of trial results and has become the recommended tool for Cochrane Reviews.

## Purpose and Application
RoB 2 is designed to assess the risk of bias in the results of a randomized trial for a specific outcome. The assessment is focused on the effect of assignment to intervention (the intention-to-treat effect). The tool can be applied to:
- Individually-randomized, parallel-group trials
- Cluster-randomized trials (using a specific adapted version)
- Crossover trials (using a specific adapted version)

## Five Domains of Bias

### 1. Bias Arising from the Randomization Process
This domain evaluates whether the allocation sequence was truly random and adequately concealed until participants were enrolled and assigned to interventions.

#### Signaling Questions:
1.1 Was the allocation sequence random?
1.2 Was the allocation sequence concealed until participants were enrolled and assigned to interventions?
1.3 Did baseline differences between intervention groups suggest a problem with the randomization process?

#### Examples:
- **Low risk**: Computer-generated random sequence with allocation concealed in sequentially numbered, opaque, sealed envelopes
- **High risk**: Allocation based on odd/even date of birth, or physician judgment
- **Some concerns**: Insufficient information about the sequence generation process

### 2. Bias Due to Deviations from Intended Interventions
This domain assesses whether deviations from the intended interventions affected the outcome.

#### Signaling Questions:
2.1 Were participants aware of their assigned intervention during the trial?
2.2 Were carers and trial personnel aware of participants' assigned intervention during the trial?
2.3 If Y/PY/NI to 2.1 or 2.2: Were there deviations from the intended intervention that arose because of the trial context?
2.4 If Y/PY to 2.3: Were these deviations likely to have affected the outcome?
2.5 If Y/PY/NI to 2.4: Were these deviations from intended intervention balanced between groups?
2.6 Was an appropriate analysis used to estimate the effect of assignment to intervention?
2.7 If N/PN/NI to 2.6: Was there potential for a substantial impact (on the result) of the failure to analyze participants in the group to which they were randomized?

#### Examples:
- **Low risk**: Double-blind trial with no important protocol deviations and analysis according to intention-to-treat principles
- **High risk**: Substantial crossover between intervention groups with analysis as-treated rather than by intention-to-treat
- **Some concerns**: Unblinded trial with some protocol deviations but analyzed by intention-to-treat

### 3. Bias Due to Missing Outcome Data
This domain evaluates whether outcome data were available for all or nearly all participants randomized.

#### Signaling Questions:
3.1 Were data for this outcome available for all, or nearly all, participants randomized?
3.2 If N/PN/NI to 3.1: Is there evidence that the result was not biased by missing outcome data?
3.3 If N/PN to 3.2: Could missingness in the outcome depend on its true value?
3.4 If Y/PY/NI to 3.3: Is it likely that missingness in the outcome depended on its true value?

#### Examples:
- **Low risk**: Complete outcome data or missing data balanced across groups with similar reasons for missingness
- **High risk**: Differential dropout rates between groups with reasons related to outcome
- **Some concerns**: Moderate dropout rates with insufficient information about reasons

### 4. Bias in Measurement of the Outcome
This domain assesses whether outcome assessors were aware of the intervention received by study participants.

#### Signaling Questions:
4.1 Was the method of measuring the outcome inappropriate?
4.2 Could measurement or ascertainment of the outcome have differed between intervention groups?
4.3 If N/PN/NI to 4.1 and 4.2: Were outcome assessors aware of the intervention received by study participants?
4.4 If Y/PY/NI to 4.3: Could assessment of the outcome have been influenced by knowledge of intervention received?
4.5 If Y/PY/NI to 4.4: Is it likely that assessment of the outcome was influenced by knowledge of intervention received?

#### Examples:
- **Low risk**: Blinded outcome assessment with objective outcomes
- **High risk**: Unblinded assessment of subjective outcomes
- **Some concerns**: Unclear blinding status for outcome assessment

### 5. Bias in Selection of the Reported Result
This domain evaluates whether the reported results were selected based on the observed data.

#### Signaling Questions:
5.1 Were the data that produced this result analyzed in accordance with a pre-specified analysis plan that was finalized before unblinded outcome data were available for analysis?
5.2 Is the numerical result being assessed likely to have been selected, on the basis of the results, from multiple outcome measurements (e.g., scales, definitions, time points) within the outcome domain?
5.3 Is the numerical result being assessed likely to have been selected, on the basis of the results, from multiple analyses of the data?

#### Examples:
- **Low risk**: Pre-specified primary outcome reported as planned in a registered protocol
- **High risk**: Multiple outcomes measured with selective reporting of favorable results
- **Some concerns**: No pre-specified analysis plan available

## Risk of Bias Judgment Algorithm

### Domain-Level Judgments
For each domain, the answers to signaling questions are used to make a judgment about the risk of bias:

- **Low risk of bias**: All signaling questions for the domain are answered with "No" or "Probably No" (except for reversed questions)
- **Some concerns**: The domain raises some concerns if the answers do not clearly indicate low or high risk of bias
- **High risk of bias**: At least one signaling question is answered with "Yes" or "Probably Yes" (or "No"/"Probably No" for reversed questions) and the algorithm determines that this introduces bias

### Overall Risk of Bias Judgment
The overall risk of bias judgment is derived from the domain-level judgments:

- **Low risk of bias**: The study is judged to be at low risk of bias for all domains
- **Some concerns**: The study is judged to raise some concerns in at least one domain, but not to be at high risk of bias for any domain
- **High risk of bias**: The study is judged to be at high risk of bias in at least one domain OR the study is judged to have some concerns for multiple domains in a way that substantially lowers confidence in the result

## Practical Application

### Step-by-Step Guide
1. **Specify the outcome** being assessed for risk of bias
2. **Specify the effect of interest** (usually the effect of assignment to intervention)
3. **For each domain**:
   - Answer all signaling questions
   - Provide free-text justification for each answer
   - Reach a domain-level judgment using the algorithm
4. **Reach an overall judgment** about risk of bias

### Implementation Tips
- Assessments should be made by at least two independent reviewers
- Disagreements should be resolved through discussion or by involving a third reviewer
- Assessments should be outcome-specific (different outcomes within the same trial may have different risks of bias)
- Detailed justifications should be provided for all judgments
- The assessment should be based on the trial report(s) and any associated documents (e.g., protocol, statistical analysis plan)

## Example Assessment

### Trial: Smith et al. (2020) - A randomized trial of Drug X versus placebo for hypertension

#### Domain 1: Randomization process
- 1.1 Was the allocation sequence random? **Yes** - Computer-generated random sequence
- 1.2 Was the allocation sequence concealed? **Probably Yes** - Central allocation system described
- 1.3 Did baseline differences suggest a problem? **No** - Groups well-balanced at baseline
- **Judgment**: Low risk of bias

#### Domain 2: Deviations from intended interventions
- 2.1 Were participants aware of intervention? **No** - Double-blind design
- 2.2 Were personnel aware of intervention? **No** - Double-blind design
- 2.6 Was an appropriate analysis used? **Yes** - Intention-to-treat analysis
- **Judgment**: Low risk of bias

#### Domain 3: Missing outcome data
- 3.1 Were data available for nearly all participants? **No** - 15% dropout rate
- 3.2 Is there evidence result was not biased? **Probably No** - No sensitivity analyses
- 3.3 Could missingness depend on true value? **Probably Yes** - Dropouts due to side effects
- 3.4 Is it likely missingness depended on true value? **Probably No** - Similar dropout rates and reasons
- **Judgment**: Some concerns

#### Domain 4: Measurement of the outcome
- 4.1 Was the measurement method inappropriate? **No** - Standard blood pressure measurement
- 4.2 Could measurement differ between groups? **No** - Same protocol for all participants
- 4.3 Were outcome assessors aware of intervention? **No** - Blinded assessment
- **Judgment**: Low risk of bias

#### Domain 5: Selection of the reported result
- 5.1 Was analysis pre-specified? **Yes** - Protocol registered with clear analysis plan
- 5.2 Multiple outcome measurements? **No** - Single primary outcome as pre-specified
- 5.3 Multiple analyses? **No** - Analysis as pre-specified
- **Judgment**: Low risk of bias

#### Overall judgment: Some concerns
(Due to concerns about missing outcome data)

## Resources and Tools
- The full RoB 2 guidance document is available at: www.riskofbias.info
- Excel implementation tool available for download
- Cochrane provides training resources and webinars on using RoB 2
- The BMJ paper introducing RoB 2: Sterne JAC, et al. BMJ 2019;366:l4898

## References
1. Sterne JAC, Savović J, Page MJ, et al. RoB 2: a revised tool for assessing risk of bias in randomised trials. BMJ 2019;366:l4898.
2. Higgins JPT, Thomas J, Chandler J, et al. Cochrane Handbook for Systematic Reviews of Interventions. 2nd Edition. Chichester: John Wiley & Sons, 2019.
3. Page MJ, Higgins JPT, Sterne JAC. Chapter 8: Assessing risk of bias in a randomized trial. In: Higgins JPT, Thomas J, Chandler J, et al. Cochrane Handbook for Systematic Reviews of Interventions. Version 6.3, 2022.
