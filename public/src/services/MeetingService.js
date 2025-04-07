const { Meeting, MeetingFile, MeetingTime, ReserveMeeting, Sale, User, Material, Submaterial } = require('../models');

class MeetingService {

   // 📌 Récupérer tous les meetings (avec les enseignants)
   static async getAllMeetings() {
    return await Meeting.findAll({
      include: [
        { model: MeetingFile, as: 'files' },
        { model: User, as: 'teacher', attributes: ['id', 'full_name', 'avatar'] },
        { 
          model: MeetingTime, 
          as: 'times', 
          include: [
            { model: Material, as: 'material', attributes: ['id', 'name'] },
            { model: Submaterial, as: 'submaterial', attributes: ['id', 'name'] } // ✅ Ajout du submaterial
          ]
        }
      ]
    });
  }

// 📌 Récupérer les meetings par level_id

static async getMeetingsByLevel(levelId) {
    try {
      return await Meeting.findAll({
        include: [
          {
            model: MeetingTime,
            as: 'times',
            where: { level_id: levelId },
            include: [
              { model: Material, as: 'material', attributes: ['id', 'name'] },
              { model: Submaterial, as: 'submaterial', attributes: ['id', 'name'] } // ✅ Ajout du submaterial
            ]
          },
          { model: User, as: 'teacher', attributes: ['id', 'full_name', 'avatar'] }
        ]
      });
    } catch (error) {
      console.error("❌ Erreur dans getMeetingsByLevel :", error);
      throw error;
    }
  }

// 📌 Récupérer un meeting par ID
static async getMeetingById(meetingId) {
    try {
      const meeting = await Meeting.findOne({
        where: { id: meetingId },
        include: [
          {
            model: MeetingTime,
            as: 'times',
            include: [
              { model: Material, as: 'material', attributes: ['id', 'name'] },
              { model: Submaterial, as: 'submaterial', attributes: ['id', 'name'] } // ✅ Ajout du submaterial
            ]
          },
          { model: User, as: 'teacher', attributes: ['id', 'full_name', 'avatar'] }
        ]
      });

      if (!meeting) throw new Error('Meeting non trouvé');

      return meeting;
    } catch (error) {
      console.error("❌ Erreur dans getMeetingById :", error.message);
      throw error;
    }
  }

    // 📌 Récupérer les horaires d'un fichier de meeting
    static async getTimesByFileId(fileId) {
        return await MeetingTime.findAll({
            where: { meeting_id: fileId }
        });
    }
    static async reserveMeeting(data) {
        try {
            // 🔍 Vérification de l'existence de l'enregistrement de vente (sale)
            const sale = await Sale.findByPk(data.sale_id);
            if (!sale) throw new Error('Vente non trouvée (sale_id invalide)');
    
            // 🔍 Vérification de l'utilisateur (user)
            const user = await User.findByPk(data.user_id);
            if (!user) throw new Error('Utilisateur non trouvé (user_id invalide)');
    
            // 🔍 Création de la réservation
            const reservation = await ReserveMeeting.create({
                meeting_id: data.meeting_id,
                sale_id: data.sale_id,
                user_id: data.user_id,
                meeting_time_id: data.meeting_time_id,
                day: data.day,
                date: data.date,
                start_at: data.start_at,
                end_at: data.end_at,
                student_count: data.student_count,
                paid_amount: data.paid_amount,
                meeting_type: data.meeting_type,
                discount: data.discount,
                link: data.link,
                password: data.password,
                description: data.description,
                status: data.status,
                created_at: data.created_at,
                locked_at: data.locked_at,
                reserved_at: data.reserved_at
            });
    
            return reservation;
        } catch (error) {
            console.error("Erreur lors de la création de la réservation : ", error); // ✅ Afficher l'erreur complète
            throw error; // Relancer l'erreur pour qu'elle soit affichée par le contrôleur
        }
    }
    static async cancelReservation(reservationId) {
        try {
            const reservation = await ReserveMeeting.findByPk(reservationId);
            if (!reservation) {
                throw new Error("Réservation non trouvée");
            }
            
            await reservation.destroy(); // Suppression de la réservation
            return { message: "Réservation annulée avec succès" };
        } catch (error) {
            console.error("Erreur lors de l'annulation de la réservation : ", error);
            throw error;
        }
    }
// 📌 Récupérer les réservations d'un utilisateur avec l'enseignant
static async getReservationsByUserId(userId) {
    try {
        const reservations = await ReserveMeeting.findAll({
            where: { user_id: userId },
            include: [
                { 
                    model: Meeting, 
                    as: 'meeting', 
                    include: [
                        { 
                            model: User, 
                            as: 'teacher',  
                            attributes: ['id', 'full_name', 'avatar']  // Récupère l'avatar et le nom complet de l'enseignant
                        },
                        { 
                            model: MeetingTime, 
                            as: 'times',
                            include: [
                                { model: Material, as: 'material' },
                                { model: Submaterial, as: 'submaterial' }
                            ]
                        }
                    ]
                },
                { model: Sale, as: 'sale' }
            ]
        });
        return reservations;
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations : ", error);
        throw error;
    }
}


    
    static async updateReservation(reservationId, data) {
        try {
            const reservation = await ReserveMeeting.findByPk(reservationId);
            if (!reservation) {
                throw new Error("Réservation non trouvée");
            }
    
            // Mise à jour de la réservation
            await reservation.update(data);
    
            return reservation;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la réservation : ", error);
            throw error;
        }
    }
         
}    
module.exports = MeetingService;
