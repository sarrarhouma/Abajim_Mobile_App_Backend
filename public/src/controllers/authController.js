const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 📌 Envoyer OTP
exports.sendOTP = async (req, res) => {
    const { mobile } = req.body;

    try {
        const user = await User.findOne({ where: { mobile } });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé.' });

        // Générer un OTP aléatoire à 4 chiffres
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // Expire en 5 minutes

        // Stocker l'OTP dans la base de données
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        console.log(`📩 OTP pour ${mobile} : ${otp}`); // À remplacer par une API SMS en prod

        res.json({ message: 'OTP envoyé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error });
    }
};

// 📌 Vérifier OTP
exports.verifyOTP = async (req, res) => {
    const { mobile, otp } = req.body;

    try {
        const user = await User.findOne({ where: { mobile } });

        if (!user || user.otp !== otp || new Date() > user.otpExpires) {
            return res.status(400).json({ message: 'OTP invalide ou expiré.' });
        }

        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: 'OTP vérifié avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error });
    }
};

// 📌 Réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
    const { mobile, newPassword } = req.body;

    try {
        const user = await User.findOne({ where: { mobile } });

        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé.' });
        }

        // Hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error });
    }
};
