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

// 🔹 Créer une réservation
static async reserveMeeting(data) {
    try {
        // 🔍 Récupération du Meeting pour obtenir l'ID de l'enseignant
        const meeting = await Meeting.findByPk(data.meeting_id);

        if (!meeting) {
            throw new Error('Meeting non trouvé pour cet ID.');
        }

        // 🔍 Récupération de l'utilisateur enseignant (seller) dans la table `users`
        const teacher = await User.findOne({
            where: { id: meeting.teacher_id, role_id: 4 } // ✅ role_id = 4 => Teacher
        });

        if (!teacher) {
            throw new Error('Enseignant non trouvé ou ce user n\'est pas un enseignant.');
        }

        const sellerId = teacher.id;  // ✅ ID de l'enseignant récupéré

        // ✅ Création de la vente avant la réservation
        const sale = await Sale.create({
            seller_id: sellerId,
            buyer_id: data.user_id,
            payment_method: data.payment_method || 'card',
            amount: data.paid_amount,
            total_amount: data.paid_amount - (data.discount || 0),
            created_at: Math.floor(Date.now() / 1000),
            type: data.type || 'meeting'
        });

        if (!sale) throw new Error('Erreur lors de la création de la vente.');

        // 🔍 Création de la réservation
        const reservation = await ReserveMeeting.create({
            meeting_id: data.meeting_id,
            sale_id: sale.id,
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
        console.error("❌ Erreur lors de la création de la réservation : ", error.message);
        throw error;
    }
}



// 🔹 Annuler une réservation
static async cancelReservation(reservationId) {
    try {
        const reservation = await ReserveMeeting.findByPk(reservationId);
        if (!reservation) {
            throw new Error("Réservation non trouvée");
        }
        
        await reservation.destroy();
        return { message: "Réservation annulée avec succès" };
    } catch (error) {
        console.error("Erreur lors de l'annulation de la réservation : ", error);
        throw error;
    }
}

// 🔹 Récupérer les réservations par utilisateur
static async getReservationsByUserId(userId) {
    try {
        const reservations = await ReserveMeeting.findAll({
            where: { user_id: userId },
            include: [
                { 
                    model: Meeting, 
                    as: 'meeting', 
                    include: [
                        { model: User, as: 'teacher', attributes: ['id', 'full_name', 'avatar'] },
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
//  updateReservation  
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


//    // 🔹 Créer une réservation
//    static async reserveMeeting(data) {
//     try {
//         // ✅ Création de la vente avant la réservation
//         const sale = await Sale.create({
//             seller_id: data.seller_id || 1954,  
//             buyer_id: data.user_id,
//             payment_method: data.payment_method || 'card',
//             amount: data.paid_amount,
//             total_amount: data.paid_amount - (data.discount || 0),
//             created_at: Math.floor(Date.now() / 1000),
//             type: data.type || 'meeting'  
//         });

//         if (!sale) throw new Error('Erreur lors de la création de la vente.');

//         // 🔍 Création de la réservation
//         const reservation = await ReserveMeeting.create({
//             meeting_id: data.meeting_id,
//             sale_id: sale.id,
//             user_id: data.user_id,
//             meeting_time_id: data.meeting_time_id,
//             day: data.day,
//             date: data.date,
//             start_at: data.start_at,
//             end_at: data.end_at,
//             student_count: data.student_count,
//             paid_amount: data.paid_amount,
//             meeting_type: data.meeting_type,
//             discount: data.discount,
//             link: data.link,
//             password: data.password,
//             description: data.description,
//             status: data.status,
//             created_at: data.created_at,
//             locked_at: data.locked_at,
//             reserved_at: data.reserved_at
//         });

//         return reservation;
//     } catch (error) {
//         console.error("Erreur lors de la création de la réservation : ", error);
//         throw error;
//     }
// }
