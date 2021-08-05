function lexicVerification(frase) {
    let cont = 0

    for (let f of frase) {
        if (f == "(") {
            cont++
        } else if (f == ")") {
            cont--
        }

        if (cont < 0)
            return false
    }

    if (cont != 0)
        return false

    return true
}

function fbfVerification(frase) {
    let c = []

    for (let i = 0; i < frase.length; i++) {
        c.push(frase[i])
    }

    let verification = true

    for (let i = 0; i < c.length; i++) {
        if (c[i].match("[a-z]") || c[i].match("[A-Z]") || c[i].match("[(-)]") || c[i].match("[(∧)]") || c[i].match("[(v)]") || c[i].match("[(→)]") || c[i].match("[(↔)]") || c[i].match(" ")) {
            verification = true
        } else {
            verification = false
        }

        if (!verification) {
            return false
        }
    }

    return true
}

function teoremProof(frase) {
    let vNot = "F"
    let fNot = "V"

    let vAnd = "VV"
    let fAnd = ["VF", "FV"]

    let vOr = ["VF", "FV"]
    let fOr = "FF"

    let vImplica = "FV"
    let fImplica = "VF"

    let vDuploImplica = ["VV", "FF"]
    let fDuploImplica = ["VF", "FV"]

    let index
    let vValues = ""

    for (let i = 0; i < frase.length; i++) {
        if (frase[i] == "∧" || frase[i] == "v" || frase[i] == "→" || frase[i] == "↔") {
            index = i
        }

        if (frase[i] == "V" || frase[i] == "F") {
            vValues += frase[i]
        }
    }

    switch (frase[index]) {
        case "∧":
            if (vValues == vAnd) {
                return "V"
            } else {
                return "F"
            }
        case "v":
            if (vValues == fOr) {
                return "F"
            } else {
                return "V"
            }
        case "→":
            if (vValues == fImplica) {
                return "F"
            } else {
                return "V"
            }
        case "↔":
            if (vValues == vDuploImplica[0] || vValues == vDuploImplica[1]) {
                return "V"
            } else {
                return "F"
            }
    }
}

//(VA v FB) → VA
// v ∧ → ↔
let frase = "(VA v FB) → VA";

if (lexicVerification(frase)) {
    console.log("A formula está lexicamente correta.")
} else {
    console.log("A formula não está lexicamente correta.")
}

if (fbfVerification(frase)) {
    console.log("A formula está bem formulada.")
} else {
    console.log("A formula não está bem formulada.")
}

if (frase.includes("(")) {
    frase.indexOf("(")

    frase.indexOf(")")

    frase.split()

    let parIndex = []

    Array.from(frase).filter((value, index) => {
        if (value == "(" || value == ")") {
            parIndex.push(index)
        }
    })

    let proposicoes = []

    for (let i = 0; i < parIndex.length; i += 2) {
        proposicoes = frase.substr(parIndex[i], parIndex[i + 1] + 1)
    }

    let stepTwo

    if (parIndex[0] > 3) {
        let aux = ""
        stepTwo = teoremProof(proposicoes)

        let sub = frase.substring(parIndex[0] + 1, frase.length - 1)

        for (let i = 0; i < sub.length - 2; i++) {
            aux += sub[i]
        }

        stepTwo = aux + stepTwo
    } else {
        stepTwo = teoremProof(proposicoes)

        let sub = frase.substr(parIndex[1] + 1, frase.length)

        for (let i = 0; i < sub.length; i++) {
            stepTwo += sub[i]
        }
    }

    console.log(teoremProof(stepTwo))
} else {
    console.log(teoremProof(frase))
}